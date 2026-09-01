// este es el panel de notas
// muestra la lista de notas y permite crear nuevas

// iconos de la libreria lucide para los botones
import { Filter, Plus } from "lucide-react";
// useEffect sirve para ejecutar codigo cuando el componente se monta o cambia
import { useEffect } from "react";
// hook que nos da la conexion a la base de datos
import { useDatabase } from "../hooks/useDatabase";

export default function Notes() {
  // pedimos la conexion a la base de datos usando el hook
  const db = useDatabase();

  // este efecto corre cuando la base de datos esta lista
  // sirve para crear la tabla de notas si no existe
  useEffect(() => {
    // si la base de datos todavia no cargo, no hacemos nada
    if (!db) return;
    // ejecutamos una orden (sql) para crear la tabla de notas
    db.execute(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT DEFAULT 'No title yet',
        content TEXT
      )
    `);
    // el efecto se vuelve a ejecutar cada vez que cambie la base de datos
  }, [db]);

  return (
    // contenedor principal del panel de notas
    <div className="w-full h-full flex flex-col items-center  gap-4 text-neutral-300 text-[11px]">
      {/* barra superior con los botones de filtrar y crear nota */}
      <section className="min-w-[90%] h-10 flex items-center justify-end gap-2">
        {/* boton de filtrar (aun sin funcion) */}
        <button className="w-7 h-7  flex gap-2 items-center justify-center cursor-pointer select-none rounded-sm focus:outline-none hover:bg-neutral-800">
          <Filter width={11} height={11} />
        </button>
        {/* boton para crear una nota nueva (aun sin funcion) */}
        <button className="w-23 h-7 flex gap-2 items-center justify-center cursor-pointer select-none rounded-sm focus:outline-none hover:bg-neutral-800">
          <Plus width={11} height={11} />
          Nueva nota
        </button>
      </section>
      {/* area donde se van a listar las notas */}
      <section className="min-w-[90%] flex-1">
        <div className="w-ful h-3 flex items-center justify-end">
          <p className="text-[9px] text-neutral-500">Notas sueltas</p>
        </div>
      </section>
    </div>
  );
}
