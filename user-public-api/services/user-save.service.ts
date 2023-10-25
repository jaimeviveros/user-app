import axios from "axios";
import express, { Application, Request, Response } from "express";
import { userInfoSchema } from "../schema/user-info.schema";
import { securityService } from "./security.service";

const app: Application = express();

class UserSaveService {
  create = async (userInfo: any) => {
    await userInfoSchema.validateAsync(userInfo);

    return await axios.post(`${process.env.user_crud_api}/user`, userInfo);
  };

  route = () => {
    app.use(securityService.verify);
    app.post("/user", async (req: Request, res: Response) => {
      try {
        const userInfo = req.body;
        await this.create(userInfo);
        res.send({
          ok: true,
        });
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
