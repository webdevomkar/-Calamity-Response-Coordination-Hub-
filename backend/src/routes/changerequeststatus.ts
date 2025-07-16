import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import isRescueAgency from '../utils/isRescueAgency';
import Request from '../models/request';
import { Types } from 'mongoose';

const router = Router();
const permittedStatus = new Set(['approved', 'denied', 'completed', 'ongoing']);
// status = approved, denied, completed, ongoing
router.post('/', isAuthenticated, isRescueAgency, async (req, res) => {
  if (!req.user) return;
  const { _id, status }: { _id: Types.ObjectId; status: string } = req.body;
  if (!permittedStatus.has(status)) {
    res.json({ error: true, message: 'Invalid status' });
  } else {
    const request = await Request.findById(_id);
    if (request) {
      request.status = status;
      await request.save();
      res.json({ error: false, message: 'Status updated' });
    }
  }
});

export default router;
