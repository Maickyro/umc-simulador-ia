"use client";

import { useState } from "react";
import { useUsuario } from "@/context/UsuarioContext";

/**
 * Componente encargado de enviar una respuesta a Gemini
 * y mostrar la retroalimentación obtenida.
 */
export default function Evaluacion() {
  const { usuario } = useUsuario();

  const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  const enviarEvaluacion = async () => {
    if (!competenciaSeleccionada) {
      alert("Seleccione una competencia.");
      return;
    }

    if (!respuesta.trim()) {
      alert("Escriba una respuesta.");
      return;
    }

    setCargando(true);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competencia: competenciaSeleccionada,
          respuesta,
        }),
      });

      const data = await res.json();

      setResultado(data);

      // Guardar historial
      const historial = JSON.parse(
        localStorage.getItem("historialEvaluaciones") || "[]"
      );

      historial.push({
        competencia: competenciaSeleccionada,
        ...data,
        fecha: new Date().toLocaleString("es-CO"),
      });

      localStorage.setItem(
        "historialEvaluaciones",
        JSON.stringify(historial)
      );

      localStorage.setItem(
        "ultimaEvaluacion",
        JSON.stringify(data)
      );

      setRespuesta("");

    } catch (error) {
      console.error(error);
      alert("Error al evaluar.");
    }

    setCargando(false);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Evaluación de Competencias
      </h2>

      <label className="block font-semibold text-black mb-2">
        Competencia
      </label>

      <select
        className="w-full border rounded-lg p-3 bg-white text-black mb-4"
        value={competenciaSeleccionada}
        onChange={(e) =>
          setCompetenciaSeleccionada(e.target.value)
        }
      >
        <option value="">
          Seleccione una competencia
        </option>

        {usuario.competencias.map((comp) => (
          <option key={comp} value={comp}>
            {comp}
          </option>
        ))}
      </select>

      <p className="text-gray-600 mb-4">
        Responde el siguiente caso práctico de acuerdo con la competencia seleccionada.
      </p>

      <textarea
        rows={6}
        className="w-full border rounded-lg p-4 text-black"
        placeholder="Escribe aquí tu respuesta..."
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
      />

      <button
        onClick={enviarEvaluacion}
        disabled={cargando}
        className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
      >
        {cargando ? "Evaluando..." : "Evaluar con IA"}
      </button>

      {resultado && (
        <div className="mt-8 border rounded-lg p-6 bg-gray-50">

          <h3 className="text-xl font-bold text-blue-700 mb-4">
            Resultado
          </h3>

          <p className="text-3xl font-bold text-green-600">
            {resultado.calificacion}/100
          </p>

          <p className="mt-4 text-black">
            {resultado.retroalimentacion}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            <div>
              <h4 className="font-bold text-green-700 mb-2">
                Puntos fuertes
              </h4>

              <ul className="list-disc ml-5 text-black">
                {resultado.puntos_fuertes?.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-red-700 mb-2">
                Áreas de mejora
              </h4>

              <ul className="list-disc ml-5 text-black">
                {resultado.areas_mejora?.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}