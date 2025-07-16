import { Request, Response, Router } from 'express';
import Sos from '../models/sos';
import RescueAgency from '../models/rescue_agency';
import RescueSos from '../models/rescue_sos';
import argon from 'argon2';
import commoner from '../models/commoners';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const {
    typeOfDisaster,
    latitude,
    longitude,
  }: {
    typeOfDisaster: string;
    latitude: number;
    longitude: number;
  } = req.body;
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
  const hash = ipAddress ? await argon.hash(ipAddress) : '';
  let createSos = false;
  if (req.cookies['apadarelief']) {
    res.send({
      error: true,
      meesage: 'You have already sent an SOS within the past 24 hours.',
    });
  } else {
    if (ipAddress) {
      const temp = await commoner.findOne({ token: hash });
      if (temp) {
        res.send({
          error: true,
          meesage: 'You have already sent an SOS within the past 24 hours.',
        });
      } else {
        createSos = true;
      }
    } else {
      createSos = true;
    }
  }
  if (createSos) {
    const sos = await Sos.create({
      typeOfDisaster,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });
    const agencies = await RescueAgency.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 3000000,
        },
      },
    });
    agencies.forEach(async (agency) => {
      await RescueSos.create({ rescue_id: agency._id, sos_id: sos._id });
    });
    res.cookie(
      'apadarelief',
      {
        token: hash,
      },
      {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
      }
    );
    res.json({ error: false, message: 'Sos sent successfully' });
  }
});

export default router;
