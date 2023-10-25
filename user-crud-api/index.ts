import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { userByUsernameService } from "./services/user-by-username.service";

import mongoose from 'mongoose';
import { userSaveService } from "./services/user-save.service";
import { userGetAllService } from "./services/user-get-all.service";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use(userByUsernameService.route());
app.use(userSaveService.route());
app.use(userGetAllService.route());

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ventipaydb');
}