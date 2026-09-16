import { useEffect, useState } from 'react';
import { useConnection } from '../contexts/ConnectionContext';
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

  const Create = async (name: string) => {
    if (!connexion) return;
    const idProject = await connexion.execute('INSERT INTO project(nameProject) VALUES($1)', [name]);
    ShowProjects(connexion);
    return idProject;
  };

  const Update = async (id: number, name: string) => {
    if (!connexion) return;
    if (!id) return;
    const newName = await connexion.execute('UPDATE project SET nameProject=$2 WHERE id=$1', [id, name]);
    ShowProjects(connexion);
    return newName;
  };

  const Delete = async (id: number) => {
    if (!connexion) return;
    if (!id) return;
    const ok = await connexion.execute('DELETE FROM project WHERE id=$1', [id]);
    ShowProjects(connexion);
    return ok;
  };

  const AscDates = async () => {
    if (!connexion) return;
    const asc = await connexion.select<ProjectTypes[]>('SELECT * FROM project ORDER BY created_at ASC');
    ShowProjects(connexion);
    return asc;
  };

  const DescDates = async () => {
    if (!connexion) return;
    const desc = await connexion.select<ProjectTypes[]>('SELECT * FROM project ORDER BY created_at DESC');
    ShowProjects(connexion);
    return desc;
  };

  return { projects, Create, Update, Delete, AscDates, DescDates };
}
