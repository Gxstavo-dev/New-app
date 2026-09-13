import { SidebarIcon } from "lucide-react";
import { useHiddeBar } from "../contexts/ToggleSidebar";
import Head from "./Sidebar/Head";
import Actions from "./Sidebar/Actions";

export default function Sidebar() {
  const { hidde, toggle } = useHiddeBar();
  return (
    <section
      className={`${hidde ? "w-0" : "w-50"} h-full flex flex-col bg-neutral-50 border-r border-r-neutral-300 overflow-hidden `}
    >
      {hidde && (
        <button
          onClick={toggle}
          className="w-7 h-7 fixed bottom-3 left-3 flex items-center justify-center rounded-xl cursor-pointer focus:outline-none text-neutral-400 hover:text-neutral-600"
        >
          <SidebarIcon width={15} height={15} />
        </button>
      )}
      <Head />
      <Actions />
    </section>
  );
}