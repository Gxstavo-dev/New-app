import { useEffect } from 'react';
import { useConnection } from './useConnection';

export default function useNotes() {
  const { connexion } = useConnection();

  useEffect(() => {
    if (!connexion) return;
  }, [connexion]);
}
