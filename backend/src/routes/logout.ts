import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('apadarelief');
  res.json({ error: false, message: 'Logged out sucessfully' });
});

export default router;
