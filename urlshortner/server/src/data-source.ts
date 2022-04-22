import { parse } from "path"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Url } from "./entity/Url"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env["DB_HOST"] || "localhost",
    port: Number(process.env["DB_PORT"]) || 3306,
    username: process.env["DB_USERNAME"] || "test",
    password: process.env["DB_PASSWORD"] || "test",
    database: process.env["DB_NAME"] || "test",
    synchronize: true,
    logging: true,
    entities: [Url],
    migrations: [],
    subscribers: [],
})
