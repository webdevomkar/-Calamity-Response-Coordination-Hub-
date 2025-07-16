import { Request, Response, NextFunction } from "express";
import isAuthenticated from "./isAuthenticated";

export default function isRescueAgency(req: Request, res: Response, next: NextFunction) {
  if(!req.user) {
    isAuthenticated(req, res, next);
  } else if(req.user.role == 1) {
    next();
  } else {
    res.status(403).json({error: true, message: 'Not authorized'});
  }
}