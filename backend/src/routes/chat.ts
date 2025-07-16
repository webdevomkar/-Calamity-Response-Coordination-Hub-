import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import {
  createChat,
  addToChat,
  sendMessage,
  chatList,
  getMessages,
  getChat,
  findChat,
} from '../controllers/ChatController';

const router = Router();

router.post('/', isAuthenticated, createChat);
router.put('/', isAuthenticated, addToChat);
router.post('/:chatId', isAuthenticated, sendMessage);
router.get('/chats', isAuthenticated, chatList);
router.get('/:chatId', isAuthenticated, getChat);
router.get('/:chatId/messages', isAuthenticated, getMessages);
router.get('/findchat', isAuthenticated, findChat);

// router.post('/', createChat);
// router.put('/', addToChat);
// router.post('/:chatId', sendMessage);
// router.get('/chats', chatList);
// router.get('/:chatId', getMessages);

export default router;
