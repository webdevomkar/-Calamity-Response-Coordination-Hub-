/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import RescueAgency from '../models/rescue_agency';
import haversineDistance from '../utils/haversine';
import axios from 'axios';
import Resource from '../models/resource';

const router = Router();

// get all agencies within a particular radius (in meters)
router.get('/', async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  if (
    typeof latitude !== 'string' ||
    typeof longitude !== 'string' ||
    (typeof radius !== 'string' && typeof radius !== 'undefined')
  ) {
    res.json({ error: true, message: 'Invalid query parameters' });
  } else {
    const lat = Number(latitude);
    const long = Number(longitude);
    const rad = radius ? Number(radius) : 500000;
    const agencies = await RescueAgency.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [long, lat],
          },
          maxDistance: rad,
          spherical: true,
          distanceField: 'distance',
        },
      },
      {
        $lookup: {
          from: 'resources',
          localField: '_id',
          foreignField: 'agency_id',
          as: 'resources',
        },
      },
    ]);
    res.send(agencies);
  }
});

router.get('/best', async (req, res) => {
  try {
    const { resources } = req.body;
    const bestAgencies = await Resource.find({
      $and: resources.map(
        (resource: { type: string; name: string; qty: number }) => ({
          // resources: {
          $elemMatch: {
            type: resource.type,
            name: resource.name,
            quantity: { $gte: resource.qty },
          },
          // },
        })
      ),
    });
    return res.status(200).json(bestAgencies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error' });
  }
});

export default router;
