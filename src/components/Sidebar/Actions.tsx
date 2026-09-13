import { FileText, Folder, FolderPlus, MessagesSquare, SquareCheckBig, Star, Tag, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Card from './Card';
import useHandlersFolder from '../../hooks/useHandlersFolder';
import type { ShowCardState } from '../../interfaces/ShowCardState';

// renderiza el panel de acciones con las carpetas y sus opciones
export default function Actions() {
  const { handlegetValue, handlerCommit, handlerCreate, handlerDelete, startEditing, setEditingId, folders, editingId, value } = useHandlersFolder();

  const [showCard, setShowCard] = useState<ShowCardState>({
    show: false,
    id: null,
  });
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // cierra el menu contextual si se hace click fuera del mismo
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (cardRef.current && !cardRef.current.contains(target)) {
        setShowCard({ show: false, id: null });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // abre el menu contextual de una carpeta y calcula su posicion
  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setBounds({ top, left });
    setShowCard((prev) => ({
      show: prev.id === id ? !prev.show : true,
      id: id,
    }));
  };

  return (
    <article className="w-full flex-1 flex flex-col gap-1 p-3 overflow-hidden">
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
        <button data-name="New thread" className="w-full h-9 rounded-lg hover:bg-neutral-100 flex items-center gap-2.5 px-2.5 text-[13px] font-medium text-neutral-700 focus:outline-none cursor-pointer transition-colors">
          <MessagesSquare width={16} height={16} strokeWidth={1.75} />
          New thread
          <p className="ml-auto text-[11px] text-neutral-400">0</p>
        </button>

        <button data-name="Notes" className="w-full h-9 rounded-lg hover:bg-neutral-100 flex items-center gap-2.5 px-2.5 text-[13px] font-medium text-neutral-700 focus:outline-none cursor-pointer transition-colors">
          <FileText width={16} height={16} strokeWidth={1.75} />
          Notes
          <p className="ml-auto text-[11px] text-neutral-400">0</p>
        </button>

        <button data-name="Tasks" className="w-full h-9 rounded-lg hover:bg-neutral-100 flex items-center gap-2.5 px-2.5 text-[13px] font-medium text-neutral-700 focus:outline-none cursor-pointer transition-colors">
          <SquareCheckBig width={16} height={16} strokeWidth={1.75} />
          Tasks
          <p className="ml-auto text-[11px] text-neutral-400">0</p>
        </button>

        <button data-name="Favorites" className="w-full h-9 rounded-lg hover:bg-neutral-100 flex items-center gap-2.5 px-2.5 text-[13px] font-medium text-neutral-700 focus:outline-none cursor-pointer transition-colors">
          <Star width={16} height={16} strokeWidth={1.75} />
          Favorites
          <p className="ml-auto text-[11px] text-neutral-400">0</p>
        </button>

        <button data-name="Tag" className="w-full h-9 rounded-lg hover:bg-neutral-100 flex items-center gap-2.5 pl-2.5 pr-2 text-[13px] text-neutral-600 hover:text-neutral-900 focus:outline-none cursor-pointer transition-colors group">
          <Tag width={16} height={16} strokeWidth={1.75} className="shrink-0 text-neutral-400 group-hover:text-neutral-500" />
          Tag
          <p className="ml-auto text-[11px] text-neutral-400">0</p>
        </button>

        <button data-name="Trash" className="w-full h-9 rounded-lg hover:bg-neutral-100 flex items-center gap-2.5 pl-2.5 pr-2 text-[13px] text-neutral-600 hover:text-neutral-900 focus:outline-none cursor-pointer transition-colors group">
          <Trash width={16} height={16} strokeWidth={1.75} className="shrink-0 text-neutral-400 group-hover:text-red-500" />
          Trash
          <p className="ml-auto text-[11px] text-neutral-400">0</p>
        </button>

        <p className="mt-5 mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Your Collections</p>

        {folders.map((folder) => {
          return (
            <button
              key={folder.id}
              data-index={folder.id}
              data-name={folder.name}
              onDoubleClick={(e) => startEditing(e, folder.id)}
              onKeyUp={(e) => e.key === 'Escape' && setEditingId(null)}
              onContextMenu={(e) => handleOpenMenu(e, folder.id)}
              className="w-full h-9 rounded-lg hover:bg-neutral-100 flex items-center gap-2.5 pl-2.5 pr-2 text-[13px] text-neutral-600 hover:text-neutral-900 focus:outline-none cursor-pointer shrink-0 overflow-hidden transition-colors group"
            >
              {showCard.id === folder.id && showCard.show ? (
                <Card ref={cardRef} top={bounds.top} left={bounds.left} id={folder.id}>
                  <button
                    onClick={() => handlerDelete(folder.id)}
                    data-name="Borrar Carpeta"
                    className="w-full h-8 flex items-center gap-2 px-3 text-[12px] font-medium text-neutral-600 cursor-pointer hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <Trash width={14} height={14} strokeWidth={1.75} />
                    Borrar Carpeta
                  </button>
                </Card>
              ) : null}
              <Folder width={16} height={16} strokeWidth={1.75} className="shrink-0 text-neutral-400 group-hover:text-neutral-500" />
              {editingId === folder.id ? (
                <input
                  value={value}
                  autoFocus
                  placeholder={folder.name}
                  className="w-full h-7 bg-white border border-neutral-200 rounded-md px-1.5 text-[13px] focus:outline-none focus:border-neutral-300"
                  onChange={(e) => handlegetValue(folder.id, e)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => handlerCommit(folder.id, e)}
                />
              ) : (
                folder.name
              )}
              <p className="ml-auto text-[11px] text-neutral-400">0</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={(e) => handlerCreate(e)}
        data-name="New Collection"
        className="w-full h-9 mt-3 shrink-0 rounded-lg border border-dashed border-neutral-300 flex items-center gap-2.5 px-2.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none cursor-pointer transition-colors"
      >
        <FolderPlus width={16} height={16} strokeWidth={1.75} />
        New Collection
      </button>
    </article>
  );
}
