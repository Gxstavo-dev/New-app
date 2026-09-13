import { Folder, FolderPlus, Folders, Star, Trash } from 'lucide-react';
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
    <article className="w-full flex-1 flex flex-col gap-3 p-5 overflow-scroll">
      <button className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer">
        <Star width={12} height={12} color="#2563eb" />
        New note
      </button>

      <button className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer">
        <Folders width={12} height={12} color="#2563eb" />
        New folder
      </button>

      <button className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer">
        <Star width={12} height={12} color="#2563eb" />
        Favorites
      </button>

      <p className="text-[10px] text-neutral-500">Your Collections</p>

      {folders.map((folder) => {
        return (
          <button
            key={folder.id}
            data-index={folder.id}
            onDoubleClick={(e) => startEditing(e, folder.id)}
            onKeyUp={(e) => e.key === 'Escape' && setEditingId(null)}
            onContextMenu={(e) => handleOpenMenu(e, folder.id)}
            className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer shrink-0 overflow-hidden "
          >
            {showCard.id === folder.id && showCard.show ? (
              <Card ref={cardRef} top={bounds.top} left={bounds.left} id={folder.id}>
                <button
                  onClick={() => handlerDelete(folder.id)}
                  className="w-30 h-7 flex items-center gap-2 justify-center text-[12px] cursor-pointer hover:bg-red-300 rounded-md"
                >
                  <Trash width={11} height={11} />
                  Borrar Carpeta
                </button>
              </Card>
            ) : null}
            <Folder
              width={12}
              height={12}
              color="#2563eb
  "
            />
            {editingId === folder.id ? (
              <input
                value={value}
                autoFocus
                placeholder={folder.name}
                className="w-[90%] h-full focus:outline-none"
                onChange={(e) => handlegetValue(folder.id, e)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => handlerCommit(folder.id, e)}
              />
            ) : (
              folder.name
            )}
          </button>
        );
      })}

      <button
        onClick={(e) => handlerCreate(e)}
        className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer"
      >
        <FolderPlus width={12} height={12} color="#2563eb" />
        New Collection
      </button>
    </article>
  );
}
