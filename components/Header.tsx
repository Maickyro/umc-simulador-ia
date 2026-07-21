/**
 * Header principal del Simulador UMC
 * Muestra el título y una breve descripción.
 */

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-blue-700">
        Simulador UMC
      </h1>

      <p className="mt-2 text-gray-600">
        Plataforma para evaluar competencias mediante Inteligencia Artificial
        y visualizar el cierre de brechas de aprendizaje.
      </p>

      <hr className="mt-6" />
    </header>
  );
}