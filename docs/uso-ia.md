# Integración de Inteligencia Artificial

La aplicación integra un modelo de lenguaje de Google Gemini para evaluar respuestas abiertas escritas por el aprendiz.

El modelo analiza la respuesta enviada por el usuario y genera:

- Calificación (0–100).
- Retroalimentación personalizada.
- Puntos fuertes.
- Áreas de mejora.

Se eligió Gemini porque ofrece una API sencilla de integrar, con un nivel de calidad adecuado para el prototipo y un plan gratuito suficiente para el desarrollo y las pruebas del assessment.

La IA no se utiliza para reemplazar la lógica de la aplicación, sino para automatizar el proceso de evaluación de respuestas abiertas, simulando el trabajo que normalmente realizaría un entrenador de la UMC.

# Integración de Inteligencia Artificial

La aplicación utiliza Google Gemini para evaluar respuestas abiertas de los aprendices.

## Flujo

Usuario

↓

Formulario

↓

API Route (Next.js)

↓

Google Gemini

↓

Respuesta JSON

↓

Dashboard

## Información obtenida

- Calificación (0–100)
- Retroalimentación
- Puntos fuertes
- Áreas de mejora

## Justificación

Se eligió Google Gemini por ofrecer una integración sencilla mediante API y un plan gratuito suficiente para desarrollar el prototipo del assessment.