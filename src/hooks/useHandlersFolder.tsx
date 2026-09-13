import { useState } from 'react';
import useFolders from './useFolders';

// hook que centraliza los manejadores y estados para crear, editar, renombrar y eliminar carpetas
export default function useHandlersFolder() {
  const [value, setValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const { folders, UpdateNameFolder, CreateFolder, DeleteFolder } = useFolders();

  // captura el valor del input y actualiza el nombre de la carpeta en vivo
  const handlegetValue = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    UpdateNameFolder(id, e.target.value);
  };

  // al presionar enter confirma el nuevo nombre y sale del modo edicion
  const handlerCommit = (id: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      UpdateNameFolder(id, value);
      setEditingId(null);
    }
  };

  // crea una carpeta nueva y activa el modo edicion para nombrarla
  const handlerCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = await CreateFolder();
    startEditing(e, Number(id));
  };

  // elimina la carpeta segun su id
  const handlerDelete = async (idx: number) => {
    await DeleteFolder(idx);
  };

  // alterna el modo edicion de una carpeta y limpia el valor del input
  const startEditing = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingId(editingId === id ? null : id);
    setValue('');
  };

  return {
    handlegetValue,
    handlerCommit,
    handlerCreate,
    handlerDelete,
    startEditing,
    setEditingId,
    folders,
    editingId,
    value,
  };
}
