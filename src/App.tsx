import MainApp from "./components/MainApp";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";
import { HiddeBarProvider } from "./contexts/HiddeBar";

export default function App() {
  return (
    <HiddeBarProvider>
      <div className="w-full h-screen flex">
        <div className="w-full h-full flex flex-col">
          <Titlebar />
          <MainApp />
        </div>
        <Sidebar />
      </div>
    </HiddeBarProvider>
  );
}
