import { ToggleSidebarProvider } from './contexts/ToggleSidebar';
import Sidebar from './components/Sidebar';

// componente raiz que envuelve la app con el proveedor de la barra lateral
export default function App() {
  return (
    <ToggleSidebarProvider>
      <main className="w-full h-screen flex">
        <Sidebar />
      </main>
    </ToggleSidebarProvider>
  );
}
