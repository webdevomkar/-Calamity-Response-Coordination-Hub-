import { Request, Response, NextFunction } from "express";
import isAuthenticated from "./isAuthenticated";

export default function isGovernmentAgency(req: Request, res: Response, next: NextFunction) {
  if(req.user === undefined) {
    isAuthenticated(req, res, next);
  } else if(req.user.role == 0) {
    next();
  } else {
    res.status(403).json({error: true, message: 'Not authorized'});
  }
}