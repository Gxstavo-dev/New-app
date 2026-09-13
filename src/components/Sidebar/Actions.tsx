import { Folder, FolderPlus, Folders, Star, Trash } from "lucide-react";
import useFolders from "../../hooks/useFolders";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";

interface ShowCardState {
  show: boolean;
  id: number | null;
}

export default function Actions() {
  const { folders, CreateFolder, GetFolder, UpdateNameFolder, DeleteFolder } =
    useFolders();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nameFolder, setNameFolder] = useState<string>("");
  const [showCard, setShowCard] = useState<ShowCardState>({
    show: false,
    id: null,
  });
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
  });
  const [value, setValue] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (cardRef.current && !cardRef.current.contains(target)) {
        setShowCard({ show: false, id: null });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlegetValue = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(e.target.value);
    setNameFolder(e.target.value);
    UpdateNameFolder(id, e.target.value);
  };

  const handlerCommit = (
    id: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      UpdateNameFolder(id, nameFolder);
      setEditingId(null);
    }
  };

  const handlegetFolder = async (id: number) => {
    const fila = await GetFolder(id);
    console.log(fila);
  };

  const handlerCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = await CreateFolder();
    startEditing(e, Number(id));
  };

  const handlerDelete = async (idx: number) => {
    await DeleteFolder(idx);
  };

  const handleOpenMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault();
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setBounds({ top, left });
    setShowCard((prev) => ({
      show: prev.id === id ? !prev.show : true,
      id: id,
    }));
  };

  const stopEditing = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  const startEditing = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingId(editingId === id ? null : id);
    setValue("");
  };

  return (
    <article className="w-full flex-1 flex flex-col gap-3 p-2 overflow-scroll">
      <p className="text-[10px] text-neutral-500">Actions</p>
      <button className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer">
        <Star
          width={12}
          height={12}
          color="#2563eb
"
        />
        Favorites
      </button>

      <button className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer">
        <Folders
          width={12}
          height={12}
          color="#2563eb
"
        />
        Folders
      </button>

      <p className="text-[10px] text-neutral-500">Your list</p>

      {folders.map((folder) => {
        return (
          <button
            key={folder.id}
            data-index={folder.id}
            onClick={() => {
              handlegetFolder(folder.id);
            }}
            onDoubleClick={(e) => startEditing(e, folder.id)}
            onKeyUp={(e) => stopEditing(e)}
            onContextMenu={(e) => handleOpenMenu(e, folder.id)}
            className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer shrink-0 overflow-hidden "
          >
            {showCard.id === folder.id && showCard.show ? (
              <Card
                ref={cardRef}
                top={bounds.top}
                left={bounds.left}
                id={folder.id}
              >
                <button
                  onClick={() => handlerDelete(folder.id)}
                  className="w-30 h-7 flex items-center gap-2 justify-center text-[12px] cursor-pointer hover:bg-red-300 rounded-md"
                >
                  <Trash width={11} height={11} />
                  Borrar Carpeta
                </button>
              </Card>
            ) : null}
            <Folder
              width={12}
              height={12}
              color="#2563eb
  "
            />
            {editingId === folder.id ? (
              <input
                value={value}
                autoFocus
                placeholder={folder.name}
                className="w-[90%] h-full focus:outline-none"
                onChange={(e) => handlegetValue(folder.id, e)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => handlerCommit(folder.id, e)}
              />
            ) : (
              folder.name
            )}
          </button>
        );
      })}

      <button
        onClick={(e) => handlerCreate(e)}
        className="w-full h-8 rounded-md hover:bg-neutral-200 flex items-center gap-1 pl-1 text-[13px] focus:outline-none cursor-pointer"
      >
        <FolderPlus width={12} height={12} color="#2563eb" />
        New list
      </button>
    </article>
  );
}
