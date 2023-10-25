import express, { Application, Request, Response } from "express";
import { UserModel } from "../schemas/user.schema";

const app: Application = express();

class UserByUsernameService {
  filter = async (username: string) => {
    return await UserModel.where({ username }).exec();
  };

  route = () => {
    app.get("/user/:username", async (req: Request, res: Response) => {
      const { username } = req.params;
      try {
        const result = await this.filter(username);
        res.send(result);
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

export const userByUsernameService = new UserByUsernameService();
