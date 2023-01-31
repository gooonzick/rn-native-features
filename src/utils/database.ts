import * as SQLite from "expo-sqlite";

import { Place } from "../models/Places";

const db = SQLite.openDatabase("places.db");

export const initDb = () => {
  const promise = new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lon REAL NOT NULL
          )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);

          return true;
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place: Place) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
            INSERT INTO places (title, imageUri, address, lat, lon)
            VALUES (?, ?, ?, ?, ?)
        `,
        [
          place.title,
          place.img,
          "blablabla",
          place.location.lat,
          place.location.lon,
        ],
        (_, result) => {
          console.log(result);
          resolve();
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const getPlaces = () => {
  return new Promise<Place[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places;`,
        [],
        (_, result) => {
          const places = result.rows._array.map(
            ({ title, imageUri, address, lat, lon, id }) =>
              new Place(title, imageUri, { lat, lon }, id)
          );
          resolve(places);
        },
        (_, error) => {
          reject(error);

          return true;
        }
      );
    });
  });
};

export const getPlaceById = (id: string | number) => {
  return new Promise<Place>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places
         WHERE id = ?`,
        [id],
        (_, result) => {
          const [place] = result.rows._array.map(
            ({ title, imageUri, address, lat, lon, id }) =>
              new Place(title, imageUri, { lat, lon }, id)
          );

          resolve(place);
        },
        (_, error) => {
          reject(error);

          return true;
        }
      );
    });
  });
};
