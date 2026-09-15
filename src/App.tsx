import ContentBox from './components/ContentBox';
import Sidebar from './components/Sidebar';
import { HiddeSidebarProvider } from './contexts/HiddeSidebar';

export default function App() {
  return (
    <HiddeSidebarProvider>
      <main className="w-full h-screen flex">
        <Sidebar />
        <ContentBox />
      </main>
    </HiddeSidebarProvider>
  );
}
