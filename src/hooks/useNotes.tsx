import { useEffect, useState } from 'react';
import { useConnection } from '../contexts/ConnectionContext';
import Database from '@tauri-apps/plugin-sql';
import NotesTypes from '../interfaces/NotesTypes';

export default function useNotes() {
  const { connexion } = useConnection();
  const [notes, setNotes] = useState<NotesTypes[]>([]);

  useEffect(() => {
    if (!connexion) return;
    ShowNotes(connexion);
  }, [connexion]);

  const ShowNotes = async (db: Database) => {
    const Notes = await db.select<NotesTypes[]>('SELECT * FROM note');
    if (!Notes) return [];
    setNotes(Notes);
  };

  const Create = async (title: string) => {
    if (!connexion) return;
    const idProject = await connexion.execute('INSERT INTO note(title) VALUES($1)', [title]);
    ShowNotes(connexion);
    return idProject;
  };

  const Update = async (id: number, title?: string, content?: string, folderId?: number) => {
    if (!connexion) return;
    if (title !== undefined) {
      await connexion.execute('UPDATE note SET title = $1 WHERE id=$2', [title, id]);
    }

    if (content !== undefined) {
      await connexion.execute('UPDATE note SET content = $1 WHERE id=$2', [content, id]);
    }

    if (folderId !== undefined) {
      await connexion.execute('UPDATE note SET folderId = $1 WHERE id=$2', [folderId, id]);
    }

    ShowNotes(connexion);
  };

  const Delete = async (id: number) => {
    if (!connexion) return;
    if (!id) return;
    const ok = await connexion.execute('DELETE FROM note WHERE id=$1', [id]);
    ShowNotes(connexion);
    return ok;
  };

  const AscDates = async () => {
    if (!connexion) return;
    const asc = await connexion.select<NotesTypes[]>('SELECT * FROM note ORDER BY created_at ASC');
    ShowNotes(connexion);
    return asc;
  };

  const DescDates = async () => {
    if (!connexion) return;
    const desc = await connexion.select<NotesTypes[]>('SELECT * FROM note ORDER BY created_at DESC');
    ShowNotes(connexion);
    return desc;
  };

  return { notes, Create, Update, Delete, AscDates, DescDates };
}
