import { decode, encode, TAlgorithm } from "jwt-simple";
import { DecodeResult, EncodeResult, ExpirationStatus, PartialSession, Session } from "../dto/jwt-user.dto";
import { encode_key } from "./login.service";
import { NextFunction, Request, Response } from "express";

class JwtGenerateService {

    encodeSession = (secretKey: string, partialSession: PartialSession): EncodeResult => {
        // Always use HS512 to sign the token
        const algorithm: TAlgorithm = "HS512";
        // Determine when the token should expire
        const issued = Date.now();
        const fifteenMinutesInMs = 15 * 60 * 1000;
        const expires = issued + fifteenMinutesInMs;
        const session: Session = {
            ...partialSession,
            issued: issued,
            expires: expires
        };
    
        return {
            token: encode(session, secretKey, algorithm),
            issued: issued,
            expires: expires
        };
    }
    
    requireJwtMiddleware(request: Request, response: Response, next: NextFunction) {
        console.log('Request recibido middle');

        const unauthorized = (message: string) => response.status(401).json({
            ok: false,
            status: 401,
            message: message
        });

        const decodeSession = (secretKey: string, tokenString: string): DecodeResult =>  {
            // Always use HS512 to decode the token
            const algorithm: TAlgorithm = "HS512";
        
            let result: Session;
        
            try {
                result = decode(tokenString, secretKey, false, algorithm);
            } catch (e: any) {
        
                // These error strings can be found here:
                // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
                if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
                    return {
                        type: "invalid-token"
                    };
                }
        
                if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
                    return {
                        type: "integrity-error"
                    };
                }
        
                // Handle json parse errors, thrown when the payload is nonsense
                if (e.message.indexOf("Unexpected token") === 0) {
                    return {
                        type: "invalid-token"
                    };
                }
        
                throw e;
            }
        
            return {
                type: "valid",
                session: result
            }
        }    
    
        const checkExpirationStatus = (token: Session): ExpirationStatus => {
            const now = Date.now();
            
            if (token.expires > now) return "active";
        
            // Find the timestamp for the end of the token's grace period
            const threeHoursInMs = 3 * 60 * 60 * 1000;
            const threeHoursAfterExpiration = token.expires + threeHoursInMs;
        
            if (threeHoursAfterExpiration > now) return "grace";
        
            return "expired";
        }

        const requestHeader = "Authorization";
        const responseHeader = "X-Renewed-JWT-Token";
        const header = request.header(requestHeader)?.split(" ")[1];
        console.log(header);
        
        if (!header) {
            return unauthorized(`Required ${requestHeader} header not found.`);
        }
    
        const decodedSession: DecodeResult = decodeSession(encode_key, header);
        
        if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
            return unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        }
    
        const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);
    
        if (expiration === "expired") {
            return unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        }
    
        let session: Session;
    
        if (expiration === "grace") {
            // Automatically renew the session and send it back with the response
            const { token, expires, issued } = this.encodeSession(encode_key, decodedSession.session);
            session = {
                ...decodedSession.session,
                expires: expires,
                issued: issued
            };
    
            response.setHeader(responseHeader, token);
        } else {
            session = decodedSession.session;
        }
    
        // Set the session on response.locals object for routes to access
        response.locals = {
            ...response.locals,
            session: session
        };
    
        // Request has a valid or renewed session. Call next to continue to the authenticated route handler
        next();
    }
    
}

export const jwtGenerateService = new JwtGenerateService();