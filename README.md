# Simulador Inteligente de Evaluación de Competencias - Overlap

Aplicación web desarrollada como prueba técnica para la empresa Overlap.

El proyecto permite registrar aprendices, asignar competencias y evaluar respuestas abiertas mediante Inteligencia Artificial utilizando Google Gemini.

---

## Objetivo

Desarrollar una aplicación que simule el proceso de evaluación de competencias de un aprendiz mediante Inteligencia Artificial, proporcionando retroalimentación automática, indicadores de desempeño e historial de evaluaciones.

---

## Tecnologías utilizadas

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Google Gemini API
- Context API
- LocalStorage

---

## Funcionalidades

Actualmente la aplicación permite:

- Registrar un aprendiz.
- Registrar una o varias competencias.
- Seleccionar la competencia que será evaluada.
- Enviar respuestas abiertas para ser evaluadas mediante Google Gemini.
- Obtener una calificación automática (0 a 100).
- Recibir retroalimentación inteligente.
- Visualizar fortalezas y áreas de mejora.
- Consultar un historial de evaluaciones.
- Visualizar un Dashboard con el avance por competencias.

---

## Arquitectura del Proyecto

El proyecto fue desarrollado utilizando una arquitectura basada en componentes, separando la lógica de negocio, la interfaz de usuario y la integración con la IA.

```text
app/
│
├── api/
│   └── evaluate/
│       └── route.ts         # Comunicación con Google Gemini
│
├── components/
│   ├── Dashboard.tsx
│   ├── Evaluacion.tsx
│   ├── Header.tsx
│   ├── Historial.tsx
│   └── RegistroForm.tsx
│
├── context/
│   └── UsuarioContext.tsx   # Estado global de la aplicación
│
└── page.tsx                 # Página principal
```

### Componentes principales

| Componente | Responsabilidad |
|------------|-----------------|
| RegistroForm | Registro del aprendiz y competencias |
| Evaluacion | Comunicación con Gemini y evaluación de respuestas |
| Dashboard | Visualización del desempeño del aprendiz |
| Historial | Consulta de evaluaciones realizadas |
| UsuarioContext | Gestión del estado compartido de la aplicación |
| API Route | Comunicación segura con Google Gemini |

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/NOMBRE-DEL-REPOSITORIO.git
```

## 2. Ingresar al proyecto

```bash
cd NOMBRE-DEL-REPOSITORIO
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Configurar la API de Google Gemini

Crear un archivo llamado:

```text
.env.local
```

Agregar la siguiente variable:

```env
GOOGLE_AI_KEY=TU_API_KEY
```

> La API Key puede obtenerse desde Google AI Studio.

## 5. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

# Flujo de uso

1. Registrar el nombre del aprendiz.
2. Agregar una o varias competencias.
3. Seleccionar la competencia a evaluar.
4. Escribir la respuesta del caso práctico.
5. Enviar la respuesta a Google Gemini.
6. Visualizar la calificación y retroalimentación.
7. Consultar el Dashboard.
8. Revisar el historial de evaluaciones.

---

# Variables de entorno

| Variable | Descripción |
|----------|-------------|
| GOOGLE_AI_KEY | API Key utilizada para comunicarse con Google Gemini |

---

# Inteligencia Artificial

La aplicación utiliza la API de **Google Gemini** para evaluar respuestas abiertas.

La IA analiza la respuesta enviada por el aprendiz y devuelve:

- Calificación.
- Retroalimentación.
- Puntos fuertes.
- Áreas de mejora.

La comunicación con Gemini se realiza mediante una API Route de Next.js para proteger la clave de acceso y centralizar la lógica de evaluación.

---

# Mejoras futuras

Durante el desarrollo se priorizó la implementación de los requisitos funcionales principales establecidos para la prueba técnica. Como posibles mejoras para futuras versiones se plantean:

- Generación de casos prácticos dinámicos según la competencia seleccionada.
- Personalización del rol de la Inteligencia Artificial para responder como un entrenador de la empresa Overlap.
- Persistencia de la información mediante una base de datos.
- Implementación de autenticación de usuarios.
- Exportación del historial de evaluaciones en formato PDF o Excel.
- Panel administrativo para el seguimiento del desempeño de los aprendices.
- Visualización de métricas y estadísticas avanzadas.

---

## Documentación

La documentación del proyecto se encuentra en la carpeta **docs/**.

- Arquitectura del sistema.
- Decisiones técnicas tomadas durante el desarrollo.
- Diario de desarrollo.
- Propuestas de mejoras futuras.

# Autor

**Michael Rodriguez**

Prueba Técnica - Overlap

Desarrollado con:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Google Gemini API

---

# Licencia

Este proyecto fue desarrollado únicamente con fines académicos y de evaluación técnica.