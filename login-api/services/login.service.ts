import express, { Application, Request, Response } from "express";
import { jwtGenerateService } from "./jwt-generate.service";
import axios from "axios";

const app: Application = express();

export const encode_key = "JULES";

class LoginService {
  verify = async (username: string, password: string) => {
    if (!username || !password) {
      throw "Faltan datos!!";
    }

    const response = await axios.get(`${process.env.user_crud_api || 'http://localhost:8010'}/user/${username}`);
    
    if (!response.data || response.data.length === 0) throw "No data";

    const userFound = response.data[0];
    console.log('Usuario encontrado: ', {userFound});
    
    /**
     * TODO el objetivo de ir solo con el username a buscar el registro
     * Es para implementar validación con Bcryp:
     * https://www.npmjs.com/package/bcryptjs
     * 
     * El objetivo es traer el usuario y comparar el hash en DB de las password
     * y compararla con la pasada por parametro.
     * bcrypt.compareSync("B4c0/\/", hash);
     */
    if (userFound.password !== password) throw "No válido";


    const session = jwtGenerateService.encodeSession(encode_key, {
      id: username,
      dateCreated: Date.now(),
    });

    return {
      ...session,
      fullname: userFound.fullname,
    };
  };

  route = () => {
    app.post("/login", async (req: Request, res: Response) => {
      const { username, password } = req.body;
      console.log('Log for user ', username, password);
      
      try {
        const jwt = await this.verify(username, password);
        res.send(jwt);
      } catch (error) {
        console.error(error);
        ({error})
        res.status(401).send({
          ok: false,
          message: error,
        });
      }
    });

    return app;
  };
}

export const loginService = new LoginService();
