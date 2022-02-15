import {createConnection} from "typeorm";

export class Connection {
    private static connection: Connection | null = null

     public static initialize() {
        if (this.connection) {
            return this.connection
        }
        this.connection = createConnection()
        return this.connection
    }
}
