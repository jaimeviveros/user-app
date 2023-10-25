import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { userGetAllService } from "./services/user-get-all.service";
import { userSaveService } from "./services/user-save.service";
import cors from "cors";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use(userGetAllService.route());
app.use(userSaveService.route());

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
