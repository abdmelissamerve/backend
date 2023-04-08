import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "database",
    port: 5432,
    username: "postgres",
    password: "secret",
    database: "postgres",
    synchronize: true, //set to false if you want to use migrations
    logging: false,
    entities: [`${__dirname}/models/**/*.ts`],
    migrations: [`${__dirname}/migrations/**/*.ts`],
    migrationsTableName: "migrations",
    subscribers: [],
});
