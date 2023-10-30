import { createContext, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';

const StorageContext = createContext({
});

export const StorageProvider = ({ children }: { children: React.ReactNode }) => {


    return (
        <StorageContext.Provider value={{}}>
            {children}
        </StorageContext.Provider>
    );
}

export const useStorage = () => {
    return useContext(StorageContext);
}

async function openDatabase(pathToDatabaseFile: string, dbName: string): Promise<SQLite.WebSQLDatabase> {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    await FileSystem.downloadAsync(
        Asset.fromModule(require(pathToDatabaseFile)).uri,
        `${FileSystem.documentDirectory}SQLite/${dbName}.db`
    );
    return SQLite.openDatabase(dbName);
}