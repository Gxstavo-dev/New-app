import { Sidebar } from 'lucide-react';
import { useHiddeBar } from '../../contexts/ToggleSidebar';

export default function Head() {
  const { toggle } = useHiddeBar();

  return (
    <section className="w-full h-7 flex items-center justify-end pr-2 bg-neutral-50">
      <button className="w-5 h-full flex items-center justify-center cursor-pointer focus:outline-none text-neutral-400 hover:text-neutral-600" onClick={toggle}>
        <Sidebar width={15} height={15} />
      </button>
    </section>
  );
}
