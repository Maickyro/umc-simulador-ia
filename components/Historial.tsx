"use client";

import { useEffect, useState } from "react";

/**
 * Historial de evaluaciones realizadas.
 */
export default function Historial() {
  const [historial, setHistorial] = useState<any[]>([]);

  useEffect(() => {
    const datos = localStorage.getItem("historialEvaluaciones");

    if (datos) {
      setHistorial(JSON.parse(datos));
    }
  }, []);

  if (historial.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Historial de Evaluaciones
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-2 text-black">
              Fecha
            </th>

            <th className="text-left p-2 text-black">
              Competencia
            </th>

            <th className="text-left p-2 text-black">
              Nota
            </th>

          </tr>

        </thead>

        <tbody>

          {historial.map((item, index) => (

            <tr key={index} className="border-b">

              <td className="p-2 text-gray-700">
                {item.fecha}
              </td>

              <td className="p-2 text-gray-700">
                {item.competencia}
              </td>

              <td className="p-2 font-bold text-blue-700">
                {item.calificacion}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}