import { Sidebar } from 'lucide-react';
import { useToggleSidebar } from '../../contexts/HiddeSidebar';

export default function Head() {
  const { toggle } = useToggleSidebar();

  return (
    <article className="w-full h-9 pl-2 relative">
      <button className="p-1 cursor-pointer rounded-md fixed top-2 left-3" onClick={toggle}>
        <Sidebar color="white" width={15} height={15} />
      </button>
    </article>
  );
}
