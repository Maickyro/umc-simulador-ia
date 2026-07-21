"use client";

import { useEffect, useState } from "react";
import { useUsuario } from "@/context/UsuarioContext";

/**
 * Dashboard principal del Simulador UMC.
 * Muestra el avance del aprendiz y el cierre de brechas.
 */
export default function Dashboard() {
  const { usuario } = useUsuario();

  const [historial, setHistorial] = useState<any[]>([]);

  /**
   * Carga el historial almacenado.
   */
  useEffect(() => {
    const cargarHistorial = () => {
      const historialGuardado = localStorage.getItem(
        "historialEvaluaciones"
      );

      if (historialGuardado) {
        setHistorial(JSON.parse(historialGuardado));
      } else {
        setHistorial([]);
      }
    };

    cargarHistorial();

    // Actualizar cada segundo por si cambia el historial
    const intervalo = setInterval(cargarHistorial, 1000);

    return () => clearInterval(intervalo);
  }, []);

  /**
   * Promedio general.
   */
  const promedio =
    historial.length > 0
      ? Math.round(
          historial.reduce(
            (total, item) => total + item.calificacion,
            0
          ) / historial.length
        )
      : 0;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        📊 Dashboard de Competencias
      </h2>

      {/* Tarjetas */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-blue-50 rounded-lg p-4 border">

          <p className="text-sm text-gray-600">
            Aprendiz
          </p>

          <h3 className="text-xl font-bold text-blue-700">
            {usuario.nombre || "Sin registrar"}
          </h3>

        </div>

        <div className="bg-green-50 rounded-lg p-4 border">

          <p className="text-sm text-gray-600">
            Competencias
          </p>

          <h3 className="text-xl font-bold text-green-700">
            {usuario.competencias.length}
          </h3>

        </div>

        <div className="bg-yellow-50 rounded-lg p-4 border">

          <p className="text-sm text-gray-600">
            Promedio IA
          </p>

          <h3 className="text-xl font-bold text-yellow-700">
            {promedio}%
          </h3>

        </div>

      </div>

      <h3 className="font-bold text-lg text-black mb-4">
        Cierre de brechas
      </h3>

      {usuario.competencias.map((competencia) => {

        const evaluaciones = historial.filter(
          (e) => e.competencia === competencia
        );

        const nota =
          evaluaciones.length > 0
            ? evaluaciones[evaluaciones.length - 1].calificacion
            : 0;

        return (
          <div key={competencia} className="mb-5">

            <div className="flex justify-between mb-2">

              <span className="font-semibold text-black">
                {competencia}
              </span>

              <span className="font-bold text-blue-700">
                {nota}%
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${nota}%`,
                }}
              />

            </div>

          </div>
        );

      })}

    </div>
  );
}