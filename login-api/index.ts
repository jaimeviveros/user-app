import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";

import { loginService } from "./services/login.service";
import { verifyService } from "./services/verify.service";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8090;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});


app.use(loginService.route());
app.use(verifyService.route());

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
