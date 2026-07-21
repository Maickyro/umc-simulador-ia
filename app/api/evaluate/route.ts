import { NextResponse } from "next/server";

/**
 * API encargada de evaluar respuestas abiertas utilizando Google Gemini.
 *
 * Entrada:
 * - respuesta
 * - competencia
 *
 * Salida:
 * - calificacion
 * - retroalimentacion
 * - puntos_fuertes
 * - areas_mejora
 */

export async function POST(req: Request) {
  const { respuesta, competencia } = await req.json();

  const API_KEY = process.env.GOOGLE_AI_KEY;

  /**
   * Criterios específicos según la competencia seleccionada.
   */
  let criterios = "";

  switch (competencia) {
    case "Manejo de Objeciones":
      criterios = `
Evalúa especialmente:

- Escucha activa.
- Empatía.
- Argumentación basada en valor.
- Manejo adecuado de las objeciones.
- Capacidad para avanzar hacia el cierre de la venta.
`;
      break;

    case "Venta Consultiva":
      criterios = `
Evalúa especialmente:

- Identificación de necesidades.
- Uso de preguntas abiertas.
- Comprensión del negocio del cliente.
- Construcción de una propuesta de valor.
- Orientación consultiva.
`;
      break;

    case "Negociación":
      criterios = `
Evalúa especialmente:

- Comunicación.
- Capacidad de negociación.
- Búsqueda de acuerdos.
- Beneficio mutuo.
- Manejo profesional del cliente.
`;
      break;

    case "Conocimiento de Producto":
      criterios = `
Evalúa especialmente:

- Exactitud de la información.
- Beneficios del producto.
- Seguridad al responder.
- Claridad técnica.
- Diferenciación frente a la competencia.
`;
      break;

    case "Servicio al Cliente":
      criterios = `
Evalúa especialmente:

- Empatía.
- Escucha activa.
- Resolución del problema.
- Comunicación.
- Satisfacción del cliente.
`;
      break;

    default:
      criterios = `
Evalúa claridad, argumentación, estructura de la respuesta y capacidad para resolver el caso.
`;
  }

  /**
   * Prompt enviado a Gemini.
   */
  const prompt = `
Eres un entrenador senior de la Universidad Corporativa Claro (UMC) de Claro Colombia.

Tu función es evaluar objetivamente la respuesta de un aprendiz durante una simulación de entrenamiento.

Competencia evaluada:

${competencia}

${criterios}

Respuesta del aprendiz:

${respuesta}

Instrucciones:

- Asigna una calificación entre 0 y 100.
- Justifica brevemente la calificación.
- Menciona entre 3 y 5 puntos fuertes.
- Menciona entre 3 y 5 áreas de mejora.
- Sé profesional, objetivo y constructivo.
- No inventes información que no esté presente en la respuesta.

Devuelve únicamente un JSON válido.

{
  "calificacion": 0,
  "retroalimentacion": "",
  "puntos_fuertes": [],
  "areas_mejora": []
}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error Gemini:", data);

      return NextResponse.json(
        {
          error: "No fue posible evaluar la respuesta.",
        },
        {
          status: 500,
        }
      );
    }

    const texto = data.candidates[0].content.parts[0].text;

    const jsonLimpio = texto
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return NextResponse.json(JSON.parse(jsonLimpio));

  } catch (error) {

    console.error("Error interno:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );
  }
}