export default interface NotesTypes {
  id: number;
  title: string;
  content: string | null;
  folderId?: number;
  created_at: string;
  updated_at: string;
}
