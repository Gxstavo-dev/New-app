import { SidebarIcon } from 'lucide-react';
import { useHiddeBar } from '../contexts/ToggleSidebar';
import Head from './Sidebar/Head';
import Actions from './Sidebar/Actions';

// renderiza la barra lateral y la oculta o muestra segun el estado
export default function Sidebar() {
  const { hidde, toggle } = useHiddeBar();
  return (
    <section className={`${hidde ? 'w-0' : 'w-60'} h-full flex flex-col bg-white border-r border-r-neutral-200 overflow-hidden transition-[width] duration-300 ease-out`}>
      {hidde && (
        <button
          onClick={toggle}
          className="w-8 h-8 fixed bottom-4 left-4 flex items-center justify-center rounded-lg bg-white border border-neutral-200 shadow-sm cursor-pointer text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 focus:outline-none transition-colors"
        >
          <SidebarIcon width={16} height={16} strokeWidth={1.75} />
        </button>
      )}
      <Head />
      <Actions />
    </section>
  );
}
