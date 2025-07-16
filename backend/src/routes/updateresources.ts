import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import Resource from '../models/resource';
import isRescueAgency from '../utils/isRescueAgency';
import { Types } from 'mongoose';

const router = Router();

// get all agencies within a particular radius (in kilometers)
router.post('/', isAuthenticated, isRescueAgency, async (req, res) => {
  if (!req.user) return;
  const {
    _id,
    type,
    name,
    quantity,
    unit,
    del
  }: {
    _id?: Types.ObjectId;
    type: string;
    name: string;
    quantity: number;
    unit: string;
    del?: boolean;
  } = req.body;
  if(del && _id) {
    await Resource.findByIdAndRemove(_id);
  }
  else if (!_id) {
    await (
      await Resource.create({
        agency_id: req.user.id,
        name: name,
        quantity: quantity,
        type: type,
        unit: unit,
      })
    ).save();
  } else {
    const x = await Resource.findById(_id);
    if (!x) {
      await (
        await Resource.create({
          agency_id: req.user.id,
          name: name,
          quantity: quantity,
          type: type,
          unit: unit,
        })
      ).save();
    } else {
      x.type = type;
      x.name = name;
      x.quantity = quantity;
      x.unit = unit;
      await x.save();
    }
  }
  res.json({ error: false, message: 'Resources updated' });
});

export default router;
