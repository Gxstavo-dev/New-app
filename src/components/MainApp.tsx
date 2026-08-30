import ContentBox from "./Content";
import Sidebar from "./Sidebar";

export default function MainApp() {
  return (
    <section className="w-full h-full flex gap-1">
      <Sidebar />
      <ContentBox />
    </section>
  );
}
