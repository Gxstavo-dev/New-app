import MainApp from "./components/MainApp";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";

export default function App() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-full h-full flex flex-col">
        <Titlebar />
        <MainApp />
      </div>
      <Sidebar />
    </div>
  );
}
