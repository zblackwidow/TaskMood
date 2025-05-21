import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type Tema = 'claro' | 'oscuro';

interface TemaContextProps {
  tema: Tema;
  setTema: (tema: Tema) => void; // <-- acepta argumento
}

const TemaContext = createContext<TemaContextProps | undefined>(undefined);

export const useTema = () => {
  const contexto = useContext(TemaContext);
  if (!contexto) throw new Error('useTema debe usarse dentro de <TemaProvider>');
  return contexto;
};

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>('claro');

  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}
