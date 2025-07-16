/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import { jwtDecrypt, jwtVerify } from 'jose';
// import { AuthenticatedReq } from '../types/schema';

const fallbackSigningSecret =
  'd7b5dae336250ab03418ca0fdcd0019d695110b500de83df6e1272b1bf9de3b6';
const fallbackEncryptionSecret =
  '5c7eea01c3dece03ebe9b847259c88865981b30a6e73b9b4f8aeaed01b912491';
const signingSecret = process.env.JWT_SIGNING_SECRET || fallbackSigningSecret;
const encryptionSecret =
  process.env.JWT_ENCRYPTION_SECRET || fallbackEncryptionSecret;
const signingKey = Buffer.from(signingSecret, 'hex');
const encryptionKey = Buffer.from(encryptionSecret, 'hex');
const jwsAlg = 'HS256';
const jweAlg = 'A256KW';
const jweEnc = 'A256GCM';

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.signedCookies || !req.signedCookies.token) {
    res.status(401).json({ error: true, message: 'Not authenticated' });
  } else {
    const signedToken = await jwtDecrypt(
      req.signedCookies.token,
      encryptionKey,
      {
        keyManagementAlgorithms: [jweAlg],
        contentEncryptionAlgorithms: [jweEnc],
      }
    );
    try {
      if (!signedToken.payload.token) {
        throw new Error();
      }
      const { payload } = await jwtVerify(
        // @ts-ignore
        signedToken.payload.token,
        signingKey,
        {
          algorithms: [jwsAlg],
        }
      );
      req.user = {
        // @ts-ignore
        id: payload.id,
        // @ts-ignore
        email: payload.email,
        // @ts-ignore
        role: payload.role,
      };
      next();
    } catch (err) {
      res.status(401).json({ error: true, message: 'Not authenticated' });
    }
  }
}
