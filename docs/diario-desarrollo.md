# Diario de Desarrollo

## Día 1

### Objetivo

Construir un prototipo funcional del simulador de cierre de brechas.

### Actividades

- Organización del proyecto.
- Definición de arquitectura.
- Integración de IA.
- Persistencia mediante LocalStorage.

### Observaciones

Se decidió mantener una arquitectura modular para facilitar futuras mejoras y escalabilidad.

## Arquitectura inicial

Se inició la separación de la interfaz en componentes reutilizables siguiendo el principio de responsabilidad única (Single Responsibility Principle).

El componente Header concentra únicamente la información de bienvenida, permitiendo mantener la página principal limpia y facilitando el mantenimiento del proyecto.

### Registro del aprendiz

Se implementó un formulario para registrar el nombre del aprendiz y las competencias a evaluar.

La información se almacena en localStorage para mantener el estado durante la sesión sin necesidad de una base de datos.

Además, se incorporaron validaciones para evitar registros incompletos y competencias duplicadas.

## Dashboard

Se desarrolló un dashboard dinámico que consulta la información almacenada en localStorage.

El tablero muestra:

- Nombre del aprendiz.
- Competencias registradas.
- Porcentaje alcanzado.
- Barra de progreso.
- Última retroalimentación generada por Gemini.

Esta solución simula el seguimiento del cierre de brechas sin requerir una base de datos.

## Historial de Evaluaciones

Se implementó un historial persistente utilizando localStorage.

Cada evaluación almacena:

- Fecha.
- Competencia evaluada.
- Calificación obtenida.

Este historial permite visualizar la evolución del aprendiz, alineándose con el objetivo principal del reto: evidenciar el cierre progresivo de brechas de conocimiento.