import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import LoginController from '../controllers/LoginController';

const router = Router();

router.post(
  '/',
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage('Invalid password'),
  (req, res, next) => {
    if (!req.body) {
      res.json({ error: true, message: 'No data sent' });
    } else if (!req.body.role) {
      res.json({ error: true, message: 'No role field sent' });
    } else if (req.body.role !== '0' && req.body.role !== '1') {
      res.json({
        error: true,
        message:
          'Invalid role. Please send 0 to login as government body, or 1 to login as a rescue agency',
      });
    } else {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        res.json({
          error: true,
          message: err
            .array()
            .map((val) => val.msg)
            .join(', '),
        });
      } else {
        next();
      }
    }
  },
  LoginController
);

export default router;
