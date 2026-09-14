import Head from './SideBar/Head';
import Projects from './SideBar/Projects';
import Quicks from './SideBar/Quicks';
import Remembers from './SideBar/Remembers';

export default function Sidebar() {
  return (
    <article className="w-70 h-screen flex flex-col bg-neutral-900/50">
      <Head />
      <Quicks />
      <Projects />
      <Remembers />
    </article>
  );
}
