import axios, { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";

class SecurityService {
  verify = async (request: Request, response: Response, next: NextFunction) => {
    const requestHeader = "Authorization";
    const header = request.header(requestHeader);

    try {
      const response = await axios.get(`${process.env.login_api}/verify`, {
        headers: {
            Authorization: header
        }
      });

      next();
    } catch (error) {
      const e = error as any;
      
      response.status(401).send({
        ok: false,
        message: "No autorizado; detalle: ",
        error1: e.data
      });
    }
  };
}

export const securityService = new SecurityService();