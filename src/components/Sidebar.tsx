import { useToggleSidebar } from '../contexts/HiddeSidebar';
import Head from './SideBar/Head';
import Projects from './SideBar/Projects';
import Quicks from './SideBar/Quicks';
import Remembers from './SideBar/Remembers';

export default function Sidebar() {
  const { hidde } = useToggleSidebar();
  return (
    <article className={`${hidde ? 'w-0 overflow-hidden delay-200' : 'w-70 delay-0'} h-screen flex flex-col transition-[width] ease bg-neutral-900/50`}>
      <Head />
      <Quicks />
      <Projects />
      <Remembers />
    </article>
  );
}
