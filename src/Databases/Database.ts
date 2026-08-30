import Database from "@tauri-apps/plugin-sql";

export default class useDatabase {
  private static instance: useDatabase;
  static getInstance(): useDatabase {
    if (!useDatabase.instance) {
      useDatabase.instance = new useDatabase();
    }
    return useDatabase.instance;
  }

  private db: Database | null = null;
  async getConnection(): Promise<Database> {
    if (!this.db) {
      this.db = await Database.load("sqlite:/mnt/hdd/Escritorio/notes/app.db");
    }
    return this.db;
  }
}
