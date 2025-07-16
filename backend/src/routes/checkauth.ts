import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';

const router = Router();

router.get(
  '/',
  isAuthenticated,
  (_req, res) => {
    res.json({ error: false, message: 'is authenticated' });
  }
);

export default router;
