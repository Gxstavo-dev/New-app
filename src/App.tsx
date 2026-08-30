import MainApp from "./components/MainApp";
import Titlebar from "./components/Titlebar";
import { HiddeBarProvider } from "./contexts/HiddeBar";

export default function App() {
  return (
    <HiddeBarProvider>
      <div className="w-full h-screen flex flex-col">
        <Titlebar />
        <MainApp />
      </div>
    </HiddeBarProvider>
  );
}
