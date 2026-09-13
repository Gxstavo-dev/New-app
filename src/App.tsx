import { ToggleSidebarProvider } from "./contexts/ToggleSidebar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <ToggleSidebarProvider>
      <main className="w-full h-screen flex">
        <Sidebar />
      </main>
    </ToggleSidebarProvider>
  );
}