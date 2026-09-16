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

  return { projects };
}
