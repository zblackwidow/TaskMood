import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

// definimos el tipo de tema
type Tema = "claro" | "oscuro";

// definimos el contexto y el tipo de su valor
interface TemaContextProps {
  tema: Tema;
  setTema: (tema: Tema) => void; // <-- acepta argumento
}

// creamos el contexto
const TemaContext = createContext<TemaContextProps | undefined>(undefined);

// creamos un hook para usar el contexto, este hook lanza un error si se usa fuera del provider, y devuelve el valor del contexto
export const useTema = () => {
  const contexto = useContext(TemaContext);
  if (!contexto)
    throw new Error("useTema debe usarse dentro de <TemaProvider>");
  return contexto;
};

// creamos el provider, que es el componente que envuelve a los demás componentes y les da acceso al contexto, el provider recibe un children, que son los componentes que van a recibir el contexto
export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("claro");

  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}
