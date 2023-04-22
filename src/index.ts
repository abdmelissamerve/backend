import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import config from "../config";
import bodyParser from "body-parser";
import usersRoutes from "./routes/admin/users.routes";
import authRoutes from "./routes/user/auth.routes";
import userProfile from "./routes/user/userProfile.routes";
import userTaskRoutes from "./routes/user/tasks.routes";
import adminTaskRoutes from "./routes/admin/tasks.routes";

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

app.use("/auth", authRoutes);

//USER ROUTES
app.use("/user/tasks", userTaskRoutes);
app.use("/user", userProfile);

//ADMIN ROUTES
app.use("/admin/users", usersRoutes);
app.use("/admin/tasks", adminTaskRoutes);

app.get("/", async (req: Request, res: Response) => {
    res.send("Health check passed!");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
