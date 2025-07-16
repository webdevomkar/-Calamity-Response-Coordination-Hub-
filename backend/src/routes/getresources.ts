import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import Resource from '../models/resource';
import isRescueAgency from '../utils/isRescueAgency';

const router = Router();

// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated, isRescueAgency, async (req, res) => {
  if (req.user) {
    const resources = await Resource.find({ agency_id: req.user.id });
    res.json({ resources: resources });
  }
});

export default router;
