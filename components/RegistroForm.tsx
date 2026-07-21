"use client";

import { useState } from "react";
import { useUsuario } from "@/context/UsuarioContext";

/**
 * Formulario para registrar al aprendiz
 * y las competencias que serán evaluadas.
 */
export default function RegistroForm() {
  const { usuario, setUsuario } = useUsuario();

  const [nombre, setNombre] = useState(usuario.nombre);
  const [competencia, setCompetencia] = useState("");

  /**
   * Competencias disponibles.
   */
  const competenciasDisponibles = [
    "Manejo de Objeciones",
    "Venta Consultiva",
    "Negociación",
    "Conocimiento de Producto",
    "Servicio al Cliente",
  ];

  /**
   * Registrar una nueva competencia.
   */
  const agregarCompetencia = () => {
    if (nombre.trim() === "" && usuario.nombre === "") {
      alert("Ingrese el nombre del aprendiz.");
      return;
    }

    if (!competencia) {
      alert("Seleccione una competencia.");
      return;
    }

    if (usuario.competencias.includes(competencia)) {
      alert("Esta competencia ya fue agregada.");
      return;
    }

    const nuevoUsuario = {
      nombre: nombre || usuario.nombre,
      competencias: [...usuario.competencias, competencia],
    };

    setUsuario(nuevoUsuario);

    setCompetencia("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">

      <h2 className="text-2xl font-bold text-blue-700 mb-5">
        Registro del Aprendiz
      </h2>

      <input
        className="w-full p-3 mb-4 border rounded-lg text-black"
        placeholder="Nombre del Aprendiz"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <div className="flex gap-2">

        <select
          className="flex-1 p-3 border rounded-lg text-black bg-white"
          value={competencia}
          onChange={(e) => setCompetencia(e.target.value)}
        >
          <option value="">Seleccione una competencia</option>

          {competenciasDisponibles.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>

        <button
          onClick={agregarCompetencia}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
        >
          Añadir
        </button>

      </div>

      <div className="mt-6">

        <p className="font-semibold text-black mb-2">
          Competencias registradas
        </p>

        {usuario.competencias.length === 0 ? (
          <p className="text-gray-500">
            No hay competencias registradas.
          </p>
        ) : (
          <ul className="list-disc ml-6 text-black">
            {usuario.competencias.map((comp) => (
              <li key={comp}>{comp}</li>
            ))}
          </ul>
        )}

      </div>

    </div>
  );
}