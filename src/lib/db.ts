import Dexie, { type EntityTable } from 'dexie';

export interface SavedPlace {
  placeId: string;
  savedAt: number;
}

const db = new Dexie('DesklyDB') as Dexie & {
  savedPlaces: EntityTable<SavedPlace, 'placeId'>;
};

// Define structure
db.version(1).stores({
  savedPlaces: 'placeId, savedAt' // Primary key is placeId
});

export { db };
