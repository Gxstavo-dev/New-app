import { useEffect, useState } from 'react';
import { useConnection } from './useConnection';
import Database from '@tauri-apps/plugin-sql';
import NotesTypes from '../interfaces/NotesType';

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

  const Create = async (db: Database, title: string) => {
    const idProject = await db.execute('INSERT INTO note(title) VALUES($1)', [title]);
    ShowNotes(db);
    return idProject;
  };

  const Update = async (db: Database, id: number, title?: string, content?: string, folderId?: number) => {
    if (title) {
      await db.execute('UPDATE note SET title = $1 WHERE id=$2', [title, id]);
      ShowNotes(db);
    }

    if (content) {
      await db.execute('UPDATE note SET content = $1 WHERE id=$2', [content, id]);
      ShowNotes(db);
    }

    if (folderId) {
      await db.execute('UPDATE note SET folderId = $1 WHERE id=$2', [folderId, id]);
      ShowNotes(db);
    }
  };

  const Delete = async (db: Database, id: number) => {
    if (!id) return;
    const ok = await db.execute('DELETE FROM note WHERE id=$1', [id]);
    ShowNotes(db);
    return ok;
  };

  const AscDates = async (db: Database) => {
    const asc = await db.select<NotesTypes[]>('SELECT * FROM note ORDER BY created_at ASC');
    ShowNotes(db);
    return asc;
  };

  const DescDates = async (db: Database) => {
    const desc = await db.select<NotesTypes[]>('SELECT * FROM note ORDER BY created_at DESC');
    ShowNotes(db);
    return desc;
  };

  return { notes, Create, Update, Delete, AscDates, DescDates };
}
