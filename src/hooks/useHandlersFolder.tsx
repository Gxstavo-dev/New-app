import { useState } from 'react';
import useFolders from './useFolders';

export default function useHandlersFolder() {
  const [value, setValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const { folders, UpdateNameFolder, CreateFolder, DeleteFolder } = useFolders();

  const handlegetValue = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    UpdateNameFolder(id, e.target.value);
  };

  const handlerCommit = (id: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      UpdateNameFolder(id, value);
      setEditingId(null);
    }
  };

  const handlerCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = await CreateFolder();
    startEditing(e, Number(id));
  };

  const handlerDelete = async (idx: number) => {
    await DeleteFolder(idx);
  };

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
