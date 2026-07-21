"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/**
 * Tipo del usuario del simulador UMC.
 */
interface Usuario {
  nombre: string;
  competencias: string[];
}

/**
 * Lo que compartirá el Context.
 */
interface UsuarioContextType {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
}

/**
 * Contexto.
 */
const UsuarioContext = createContext<UsuarioContextType | undefined>(
  undefined
);

/**
 * Provider principal.
 */
export function UsuarioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    competencias: [],
  });

  /**
   * Cargar datos guardados.
   */
  useEffect(() => {
    const guardado = localStorage.getItem("usuarioUMC");

    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
  }, []);

  /**
   * Guardar automáticamente cuando cambie.
   */
  useEffect(() => {
    localStorage.setItem(
      "usuarioUMC",
      JSON.stringify(usuario)
    );
  }, [usuario]);

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

/**
 * Hook personalizado.
 */
export function useUsuario() {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error(
      "useUsuario debe utilizarse dentro de UsuarioProvider"
    );
  }

  return context;
}