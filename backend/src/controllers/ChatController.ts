import { Request, Response } from 'express';
import RescueAgency from '../models/rescue_agency';
import Chat from '../models/chat';
// import { Types } from 'mongoose';
import Message from '../models/message';
import { Types } from 'mongoose';

const chatList = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    // const user = {
    //   id: '6502e4e07334dcc0d7599107',
    //   email: 'ndrf@gov.in',
    //   role: 1,
    // };

    if (user) {
      const chats = await Chat.aggregate([
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          $match: { members: new Types.ObjectId(user.id) },
        },
        {
          $lookup: {
            from: 'rescue-agencies',
            localField: 'members',
            foreignField: '_id',
            as: 'members',
          },
        },
        {
          $lookup: {
            from: 'messages',
            localField: 'lastMsg',
            foreignField: '_id',
            as: 'lastMsg',
          },
        },
        {
          $unwind: {
            path: '$lastMsg',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            'lastMsg.createdAt': -1,
          },
        },
      ]);

      return res.status(200).json(chats);
    }
    return res.status(400).json({ message: 'no user id passed' });
  } catch (error) {
    // console.log('1st2');
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getChat = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId)
      .populate({
        path: 'messages',
        populate: {
          path: 'sender',
          model: 'RescueAgency',
        },
      })
      .populate('members')
      .catch((err) => {
        console.error(err);
      });

    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const sendMessage = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const { chatId } = req.params;
    const user = req.user;

    if (user) {
      if (content.trim() === '') {
        return res.status(400).json({ message: 'Empty message' });
      }

      const msg = await Message.create({
        content,
        sender: user.id,
      });

      const populatedMsg = await msg.populate('sender');

      await Chat.findByIdAndUpdate(
        chatId,
        { lastMsg: msg._id, $addToSet: { messages: msg._id } },
        { new: true }
      );

      return res.status(200).json(populatedMsg);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const createChat = async (req: Request, res: Response) => {
  try {
    const { rescue_id1, rescue_id2 } = req.body;

    const rescue1 = await RescueAgency.findById(rescue_id1);
    const rescue2 = await RescueAgency.findById(rescue_id2);

    if (!rescue1 || !rescue2) {
      return res.status(400).json({ message: "- agencies don't exist." });
    }

    const chat = await Chat.create({ members: [rescue_id1, rescue_id2] });
    const populatedChat = await chat.populate('members');
    return res.status(200).json(populatedChat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const addToChat = async (req: Request, res: Response) => {
  try {
    const { rescueId, chatId } = req.body;
    const agency = await RescueAgency.findById(rescueId);
    if (!agency) {
      return res.status(400).json({ message: "That agency doesn't exist." });
    }

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { members: agency._id } },
      { new: true }
    );

    if (chat) {
      const populatedChat = await chat.populate('members', '-password');
      return res.status(200).json(populatedChat);
    }
    return res.status(500).json({ message: "That chat doesn't exist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const findChat = async (req: Request, res: Response) => {
  try {
    const { rescue_id1, rescue_id2 } = req.body;
    console.log(rescue_id1);
    console.log(rescue_id2);
    const chat = await Chat.aggregate([
      {
        $match: {
          members: {
            $all: [
              new Types.ObjectId(rescue_id1),
              new Types.ObjectId(rescue_id2),
            ],
          },
        },
      },
    ]);
    return res.status(200).json({ chat });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export {
  chatList,
  createChat,
  addToChat,
  getMessages,
  sendMessage,
  getChat,
  findChat,
};
