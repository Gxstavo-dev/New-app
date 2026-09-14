import ContentBox from './components/ContentBox';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <main className="w-full h-screen flex">
      <Sidebar />
      <ContentBox />
    </main>
  );
}
