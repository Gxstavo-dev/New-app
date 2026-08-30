import { Filter, Plus } from "lucide-react";
import { useEffect } from "react";
import useDatabase from "../Databases/Database";

async function connection() {
  const db = await useDatabase.getInstance().getConnection();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT DEFAULT 'No title yet',
      content TEXT
    )
  `);
}

export default function Notes() {
  useEffect(() => {
    connection();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center  justify-center gap-4 p-2 text-neutral-300 text-[11px]">
      <section className="w-full h-10 flex gap-3 items-center justify-end">
        <button className="w-7 h-7 flex gap-2 items-center justify-center cursor-pointer select-none rounded-sm focus:outline-none hover:bg-neutral-800">
          <Filter width={11} height={11} />
        </button>
        <button className="flex-1 h-7 flex gap-2 items-center justify-end pr-3 cursor-pointer select-none rounded-sm focus:outline-none hover:bg-neutral-800">
          Nueva nota
          <Plus width={11} height={11} />
        </button>
      </section>
      <section className="w-full flex-1 ">
        <div className="w-full h-3 flex items-center justify-end pr-4">
          <p className="text-[9px] text-neutral-500">Notas sueltas</p>
        </div>
      </section>
    </div>
  );
}
