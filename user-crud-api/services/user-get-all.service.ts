import express, { Application, Request, Response } from "express";
import { UserModel } from "../schemas/user.schema";

const app: Application = express();

class UserGetAllService {
  getAll = async () => {
    return await UserModel.find({}).exec();
  };

  route = () => {
    app.get("/user", async (req: Request, res: Response) => {
      try {
        const result = await this.getAll();
        const map = result.map((user) => {
          user.password = "";

          return user;
        });

        res.send(map);
      } catch (error) {
        res.status(400).send({
          ok: false,
          message: error,
        });
      }
    });

    return app;
  };
}

export const userGetAllService = new UserGetAllService();
