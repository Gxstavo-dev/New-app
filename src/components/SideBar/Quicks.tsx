import { ListCheck, Search, StickyNote } from 'lucide-react';

export default function Quicks() {
  return (
    <article className="w-full flex flex-col gap-3 p-2">
      <button className="w-full h-9 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer">
        <StickyNote width={14} height={14} strokeWidth="1.4" />
        Nueva nota
      </button>
      <button className="w-full h-9 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer">
        <Search width={14} height={14} strokeWidth="1.4" />
        Buscar
      </button>
      <button className="w-full h-9 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer">
        <ListCheck width={14} height={14} strokeWidth="1.4" />
        Tareas
      </button>
    </article>
  );
}
