import express, { Express, Request, Response } from "express";
import { json } from "body-parser";
import { configDotenv } from "dotenv";
import { router } from "./router";

configDotenv();

const port = process.env.PORT || 8080;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(json());

app.get("/", (_: Request, res: Response): void => {
  res.status(200).send("Welcome to TUBE AI!");
});

app.use("/api", router);

app.listen(port, (): void => {
  console.log(`server listening on http://localhost:${port}`);
});