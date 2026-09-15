import { Search, StickyNote } from 'lucide-react';
import { useEffect, useState } from 'react';

const searchData = [
  { id: 1, title: 'Lista de compras', content: 'Leche, pan y huevos' },
  { id: 2, title: 'Proyecto notas', content: 'App de notas con Tauri y React' },
  { id: 3, title: 'Recordatorio médico', content: 'Cita con el dentista a las 3pm' },
  { id: 4, title: 'Tareas del lunes', content: 'Terminar reporte de diseño' },
  { id: 5, title: 'Reunión de equipo', content: 'Preparar presentación del sprint' },
  { id: 6, title: 'Reunión de equipo', content: 'Preparar presentación del sprint' },
  { id: 7, title: 'Reunión de equipo', content: 'Preparar presentación del sprint' },
  { id: 8, title: 'Reunión de equipo', content: 'Preparar presentación del sprint' },
];

export default function Quicks() {
  const [isSearch, setSearch] = useState(false);
  const [query, setQuery] = useState('');

  const results = searchData.filter((item) => `${item.title} ${item.content}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearch((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <article className="w-full flex flex-col gap-3 p-2">
      <button className="w-full h-9 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer">
        <StickyNote width={14} height={14} strokeWidth="1.4" />
        Nueva nota
      </button>

      <div className="flex flex-col gap-3 overflow-scroll">
        <div className="relative w-full h-9">
          <div
            onClick={() => setSearch(!isSearch)}
            className="w-full h-9 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer transition-[height] ease-spring duration-500"
          >
            <Search width={14} height={14} strokeWidth="1.4" />
            {!isSearch && (
              <p className="w-full h-full flex items-center justify-between pr-2">
                Buscar
                <span className="text-gray-600">Ctrl + k</span>
              </p>
            )}
          </div>

          {isSearch && (
            <div className="pointer-events-none absolute inset-0 flex items-center pl-8">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onDoubleClick={() => setSearch(false)}
                placeholder="Buscar nota..."
                className="pointer-events-auto w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-[12px] text-white"
              />
            </div>
          )}
        </div>

        <div className={`transition-all ease-spring duration-500 overflow-scroll scrollbar-thin ${isSearch ? 'opacity-100 max-h-30 ' : 'opacity-0 max-h-0'}`}>
          {results.map((item) => (
            <button
              key={item.id}
              className="w-full h-9 text-[12px] text-left text-white flex flex-col items-start justify-center gap-0 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer"
            >
              <span>{item.title}</span>
              <span className="text-[10px] text-neutral-500 truncate w-full">{item.content}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
