import { Sequelize } from "sequelize";

export default new Sequelize({
    dialect: "postgres",
    host: "database",
    port: 5432,
    database: "postgres",
    username: "postgres",
    password: "secret",
});
