import { createConnection } from "typeorm";
import * as server from "./server";

async function setup() {
    const connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "api",
        password: "api",
        database: "api",
        synchronize: true,
        logging: false,
        entities: ["src/entity/**/*.ts"],
        migrations: ["src/migration/**/*.ts"],
        subscribers: ["src/subscriber/**/*.ts"],
    });

    server.server(true, connection);
}

setup();
