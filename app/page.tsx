"use client";

import Header from "@/components/Header";
import RegistroForm from "@/components/RegistroForm";
import Evaluacion from "@/components/Evaluacion";
import Dashboard from "@/components/Dashboard";
import Historial from "@/components/Historial";

import { UsuarioProvider } from "@/context/UsuarioContext";

/**
 * Página principal del Simulador UMC.
 *
 * Todos los componentes comparten la información
 * del aprendiz mediante UsuarioContext.
 */
export default function Home() {
  return (
    <UsuarioProvider>
      <main className="max-w-5xl mx-auto p-8 space-y-8">

        <Header />

        <RegistroForm />

        <Evaluacion />

        <Dashboard />

        <Historial />

      </main>
    </UsuarioProvider>
  );
}