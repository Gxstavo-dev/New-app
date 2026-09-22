import { Clock, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Remembers() {
  const [hidde, setHidde] = useState(false);

  return (
    <article className="w-full max-h-65 flex gap-4 flex-col p-4">
      <div className="w-full h-5 flex items-center justify-between">
        <p className="text-white text-[12px] font-medium cursor-pointer" onClick={() => setHidde(!hidde)}>
          Recordatorios
        </p>
        <button className="cursor-pointer text-whit flex items-center justify-center h-full w-4">
          <Plus width={13} height={13} strokeWidth="1.5" color="white" />
        </button>
      </div>

      {!hidde && (
        <div className="w-full flex flex-col gap-2">
          <button className="w-full p-2 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer">
            <Clock width={14} height={14} strokeWidth="1.4" />
            Nueva nota
          </button>
        </div>
      )}
    </article>
  );
}
