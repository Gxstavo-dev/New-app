import { useEffect, useState } from 'react';
import { useConnection } from './useConnection';
import ProjectTypes from '../interfaces/ProjectTypes';
import Database from '@tauri-apps/plugin-sql';

export default function useProjects() {
  const { connexion } = useConnection();
  const [projects, setProjects] = useState<ProjectTypes[]>([]);

  useEffect(() => {
    if (!connexion) return;
    ShowProjects(connexion);
  }, [connexion]);

  const ShowProjects = async (db: Database) => {
    const Projects = await db.select<ProjectTypes[]>('SELECT * FROM project');
    if (!Projects) return [];
    setProjects(Projects);
  };

  const Create = async (db: Database, name: string) => {
    const idProject = await db.execute('INSERT INTO project(nameProject) VALUES($1)', [name]);
    ShowProjects(db);
    return idProject;
  };

  const Update = async (db: Database, id: number, name: string) => {
    if (!id) return;
    const newName = await db.execute('UPDATE project SET nameProject=$2 WHERE id=$1', [id, name]);
    ShowProjects(db);
    return newName;
  };

  const Delete = async (db: Database, id: number) => {
    if (!id) return;
    const ok = await db.execute('DELETE FROM project WHERE id=$1', [id]);
    ShowProjects(db);
    return ok;
  };

  const AscDates = async (db: Database) => {
    const asc = await db.select<ProjectTypes[]>('SELECT * FROM project ORDER BY created_at ASC');
    ShowProjects(db);
    return asc;
  };

  const DescDates = async (db: Database) => {
    const desc = await db.select<ProjectTypes[]>('SELECT * FROM project ORDER BY created_at DESC');
    ShowProjects(db);
    return desc;
  };

  return { projects, Create, Update, Delete, AscDates, DescDates };
}
