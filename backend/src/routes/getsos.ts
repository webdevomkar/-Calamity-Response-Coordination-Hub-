import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import isRescueAgency from '../utils/isRescueAgency';
import RescueSos from '../models/rescue_sos';

const router = Router();

// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated, isRescueAgency, async (req, res) => {
  if (req.user) {
    const sos = (await RescueSos.find({ rescue_id: req['user'].id }).populate(
      'sos_id'
    )).map(sos => sos.sos_id).filter(x => x !== null);
    res.json(sos);
  }
});

export default router;
