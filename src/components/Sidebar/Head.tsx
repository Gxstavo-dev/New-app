import { Sidebar } from 'lucide-react';
import { useHiddeBar } from '../../contexts/ToggleSidebar';

// renderiza la cabecera de la barra con el boton que la oculta
export default function Head() {
  const { toggle } = useHiddeBar();

  return (
    <section className="w-full h-10 flex items-center justify-end pr-2 bg-white border-b border-neutral-100 shrink-0">
      <button className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none transition-colors" onClick={toggle}>
        <Sidebar width={16} height={16} strokeWidth={1.75} />
      </button>
    </section>
  );
}
