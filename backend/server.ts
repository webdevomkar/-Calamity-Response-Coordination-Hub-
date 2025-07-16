import express from 'express';
import dotenv from 'dotenv';
// import morgran from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './src/routes/index';
import { instrument } from '@socket.io/admin-ui';
import { addRequest, updateRequest } from './src/controllers/RequestController';
import nodemailer from 'nodemailer';
import User from './src/models/user';
import path from 'path';

dotenv.config();

async function connect() {
  if (process.env.MONGODB_CONNECTION_STRING) {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('Successfully connected to database');
  } else {
    console.error(
      'Connection string not specified. Please specify connection string in an environment variable MONGODB_CONNECTION_STRING in .env file in root folder'
    );
  }
}
connect();

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

const fallbackCookieSigningSecret =
  '4f5b8f67d973a914c695b47800fb22b887eda1a290829110e3aebc6383d65c6b';
// middlewares
app.use(
  cors({
    origin: ['http://localhost:3001', 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(function (req, res, next) {
  // res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgran('dev'));
app.use(
  cookieParser(process.env.COOKIE_SIGNING_SECRET || fallbackCookieSigningSecret)
);
app.use('/api', router);
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3001',
      'http://localhost:5173',
      'https://admin.socket.io',
    ],
    credentials: true,
  },
});

nodemailer;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'crisis.avengers.spit@gmail.com',
    pass: 'ewbnaxxozlgkwyub ',
  },
});

function sendMail(to: string, subject: string, text: string) {
  try {
    const mailOptions = {
      from: 'crisis.avengers.spit@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

io.on('connection', (socket) => {
  // console.log('a user connected');

  socket.on('join-room', (room) => {
    // console.log('joined room' + room);
    socket.join(room);
  });

  socket.on('send-request', async (room, req_data) => {
    const request_data = await addRequest(req_data);
    socket.to(room).emit('receive-request', request_data);
    let itemString = '';
    for (let i = 0; i < request_data.requested_items.length; i++) {
      itemString += `${i + 1}. Type: ${
        request_data.requested_items[i].type
      }\nName: ${request_data.requested_items[i].name}\nQuantity: ${
        request_data.requested_items[i].qty
      }\nUnit: ${request_data.requested_items[i].unit}\n`;
    }
    const email = (
      await User.findOne({ _id: req_data.requestee_id })
    )?.email.trim();
    if (email) {
      sendMail(
        // email,
        'crisis.avengers.spit@gmail.com',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        `Request from ${request_data.rescue_requester_id.name}`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        `Rescue agency ${request_data.rescue_requester_id.name} has sent a request:\n\n\nRequested resources:\n${itemString}`
      );
    }
  });

  socket.on('respond-to-request', async (room, reqId, newStatus) => {
    await updateRequest(reqId, newStatus);
    socket.to(room).emit('responded-to-request', reqId, newStatus);
  });

  socket.on('new-message', (room, message) => {
    socket.to(room).emit('receive-message', message, room);
  });

  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });

  socket.on('typing', (username, chatId) => {
    socket.to(chatId).emit('is-typing', username, chatId);
  });

  socket.on('stop-typing', (username, chatId) => {
    socket.to(chatId).emit('isnt-typing', username, chatId);
  });

  socket.on('update-location', (userId, newLocation) => {
    io.emit('receive-locations', userId, newLocation);
  });
});

instrument(io, {
  auth: false,
  mode: 'production',
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
