import 'reflect-metadata';
import {createConnection, Connection} from 'typeorm';

export const establishConnection = async (): Promise<Connection> => {
    return createConnection()
}
