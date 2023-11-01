import * as SQLite from 'expo-sqlite';
import { ReactNode, createContext, useContext } from "react";

const db = SQLite.openDatabase('boba-tracker.db');
db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS drinks (id INTEGER PRIMARY KEY AUTOINCREMENT, store TEXT, drink TEXT, date INTEGER, price REAL, size TEXT, rating REAL, notes TEXT)'
    );
});

type DatabaseContext = {
    db: SQLite.Database;
    query: (query: string) => Promise<any[]>;
    mutate: (mutation: string, params: (string | number | null)[]) => Promise<SQLite.SQLResultSet>;
}

const DatabaseContext = createContext({} as DatabaseContext);

export function useDatabase() {
    return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }: { children: ReactNode }) {
    // SELECT * FROM drinks
    async function query(query: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    query,
                    [],
                    (_, { rows: { _array: result } }) => resolve(result),
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                )
            });
        });
    }

    // INSERT INTO drinks (store, drink, date, price, size, rating, notes) VALUES (?, ?, ?, ?, ?, ?, ?)
    // [...valuse]
    // UPDATE drinks SET store = ?, drink = ?, date = ?, price = ?, size = ?, rating = ?, notes = ? WHERE id = ?
    // [...values, id]
    // DELETE FROM drinks WHERE id = ?
    // [id]
    async function mutate(mutation: string, params: (string | number | null)[]): Promise<SQLite.SQLResultSet> {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    mutation,
                    params,
                    (_, result) => resolve(result),
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                )
            });
        });
    }

    return (
        <DatabaseContext.Provider value={{ db, query, mutate }}>
            {children}
        </DatabaseContext.Provider>
    );
}