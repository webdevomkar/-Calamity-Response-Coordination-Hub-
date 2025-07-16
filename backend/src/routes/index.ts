import { Router } from 'express';
import signupRouter from './signup';
import loginRouter from './login';
import checkAuth from './checkauth';
import logout from './logout';
import getagencies from './getagencies';
import changerequeststatus from './changerequeststatus';
import getsentrequests from './getsentrequests';
import getreceivedrequests from './getreceivedrequests';
import getresources from './getresources';
import updateresources from './updateresources';
import chatRouter from './chat';
import sos from  './sos';
import getsos from  './getsos';


// import isAuthenticated from '../utils/isAuthenticated';
// import isRescueAgency from '../utils/isRescueAgency';

// importing all models

const router = Router();

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/checkauth', checkAuth);
router.use('/logout', logout);
router.use('/getagencies', getagencies); // get all agencies and their inventory details to display it on the map
router.use('/changerequeststatus', changerequeststatus); // update request status
router.use('/getsentrequests', getsentrequests); // all requests issued by a user
router.use('/getreceivedrequests', getreceivedrequests); // all requests issued by an agency
router.use('/getresources', getresources); // to display inventory to a rescue agency
router.use('/updateresources', updateresources); // to let rescue agencies update their inventory details

router.use('/getsos', getsos); // to let rescue agencies update their inventory details
router.use('/sos', sos); // to let rescue agencies update their inventory details

router.use('/chat', chatRouter);

// error route
router.all('*', (req, res) => {
  // res.send(req.user);
  res.status(404).json({ error: true, message: "Endpoint doesn't exist" });
});

export default router;
