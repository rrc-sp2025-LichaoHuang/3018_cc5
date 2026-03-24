import express, { Express } from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import resourceRoutes from "./api/v1/routes/resourceRoutes";

/** import the routes **/

const app: Express = express();

if (process.env.NODE_ENV === "production") {
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    app.use(consoleLogger);
}

app.use(express.json());

/** use the routes **/

app.use("/api/v1", resourceRoutes);


app.use(errorHandler);

export default app;