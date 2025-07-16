import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import SignupController, { sendOtp } from '../controllers/SignupController';

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
    .withMessage(
      'Password not strong enough: must be atleast 8 characters long and must contain atleast one lowercase, uppercase and special character'
    ),
  body('name')
    .escape()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name required'),
  body('description').optional().trim().escape(),
  body('location')
    .escape()
    .trim()
    .isLatLong()
    .withMessage('Location required')
    .escape(),
  body('address')
    .escape()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Address required'),
  body('type').escape().isLength({ min: 1 }).withMessage('Type required'),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      // console.log(err.array());
      res.json({
        error: true,
        message: err
          .array()
          .map((val) => val.msg)
          .join(', '),
      });
    } else {
      const { phonesNumbers } = req.body;
      if (!Array.isArray(phonesNumbers)) {
        res.json({ error: true, message: 'No phone number provided' });
      } else {
        let error = false;
        for (let i = 0; i < phonesNumbers.length; i++) {
          if (
            typeof phonesNumbers[i] !== 'string' ||
            phonesNumbers[i].length !== 10
          ) {
            error = true;
            res.json({ error: true, message: 'Invalid phone number' });
            break;
          }
        }
        if (!error) {
          next();
        }
      }
    }
  },
  SignupController
);

router.post('/otp', sendOtp);

export default router;
