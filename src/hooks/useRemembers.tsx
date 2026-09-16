import { useEffect, useState } from 'react';
import { useConnection } from './useConnection';
import RememberTypes from '../interfaces/RememberTypes';
import Database from '@tauri-apps/plugin-sql';

export default function useRemembers() {
  const { connexion } = useConnection();
  const [remembers, setRemembers] = useState<RememberTypes[]>([]);

  useEffect(() => {
    if (!connexion) return;
    ShowRemembers(connexion);
  }, [connexion]);

  const ShowRemembers = async (db: Database) => {
    const Remembers = await db.select<RememberTypes[]>('SELECT * FROM remembers');
    if (!Remembers) return [];
    setRemembers(Remembers);
  };

  const Create = async (db: Database, title: string, date: number, hour: number) => {
    const id = await db.execute('INSERT INTO remembers(title,date,hour) VALUES ($1,$2,$3)', [title, date, hour]);
    ShowRemembers(db);
    return id;
  };

  const Update = async (db: Database, id: number, title?: string, date?: number, hour?: number) => {
    if (!id) return;
    const newRemember = await db.execute('UPDATE remembers SET title=$1, date=$2, hour=$3  WHERE id=$4', [title, date, hour, id]);
    ShowRemembers(db);
    return newRemember;
  };

  const Delete = async (db: Database, id: number) => {
    if (!id) return;
    const ok = await db.execute('DELETE FROM remembers WHERE id=$1', [id]);
    ShowRemembers(db);
    return ok;
  };

  const AscDates = async (db: Database) => {
    const asc = await db.select<RememberTypes[]>('SELECT * FROM remembers ORDER BY created_at ASC');
    ShowRemembers(db);
    return asc;
  };

  const DescDates = async (db: Database) => {
    const desc = await db.select<RememberTypes[]>('SELECT * FROM remembers ORDER BY created_at DESC');
    ShowRemembers(db);
    return desc;
  };

  return { remembers, Create, Update, Delete, AscDates, DescDates };
}
