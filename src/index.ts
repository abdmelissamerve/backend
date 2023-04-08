import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import config from "../config";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.routes";
import authRoutes from "./routes/user/auth.routes";
import userProfile from "./routes/user/userProfile.routes";
import cors from "cors";
import { AppDataSource } from "./dataSource";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app: Application = express();
const port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/user", userProfile);

app.get("/", async (req: Request, res: Response) => {
    res.send("Health check passed!");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
