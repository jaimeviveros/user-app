import express, { Application, Request, Response } from "express";
import { UserModel } from "../schemas/user.schema";

const app: Application = express();

class UserSaveService {
  save = (userInfo: any) => {
    const userModel = new UserModel(userInfo);

    userModel.save();
  };

  route = () => {
    app.post("/user", (req: Request, res: Response) => {
      const { username, email, fullname, password } = req.body;
      try {
        this.save({ username, email, fullname, password });
        console.log({ username });

        res.send(username);
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

export const userSaveService = new UserSaveService();
