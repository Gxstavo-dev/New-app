import ContentBox from './components/ContentBox';
import Sidebar from './components/Sidebar';
import { ConnectionProvider } from './contexts/ConnectionContext';
import { HiddeSidebarProvider } from './contexts/HiddeSidebar';

export default function App() {
  return (
    <ConnectionProvider>
      <HiddeSidebarProvider>
        <main className="w-full h-screen flex">
          <Sidebar />
          <ContentBox />
        </main>
      </HiddeSidebarProvider>
    </ConnectionProvider>
  );
}
