import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import config from "../config";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.routes";
import database from "./database";

const app: Application = express();
const port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

database.sync().then(() => {
    console.log("Database has been resync");
});

app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
