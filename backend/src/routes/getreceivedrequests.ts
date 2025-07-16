import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import Request from '../models/request';
import isRescueAgency from '../utils/isRescueAgency';

const router = Router();

// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated, isRescueAgency, async (req, res) => {
  if (!req.user) return;
  const requests = await Request.find({ requestee_id: req.user.id }).populate(
    'govt_requester_id rescue_requester_id requestee_id'
  );
  // const requests = await Request.aggregate([
  //   {
  //     $match: {
  //       requestee_id: req.user.id,
  //     },
  //   },
  // {
  //   $lookup: {
  //     from: 'users',
  //     localField: 'govt_requester_id',
  //     foreignField: '_id',
  //     as: 'govt_requester',
  //   },
  // },
  // {
  //   $lookup: {
  //     from: 'users',
  //     localField: 'rescue_requester_id',
  //     foreignField: '_id',
  //     as: 'rescue_requester',
  //   },
  // },
  // ]);
  res.json({ requests: requests });
});

export default router;
