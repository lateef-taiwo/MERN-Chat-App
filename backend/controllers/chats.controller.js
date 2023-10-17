const { User } = require("../models/user.model");
const { Chat } = require("../models/chats.models");

const accessChat = async (req, res) => {
  try {
    const { userid } = req.body;
    //  console.log(req.user);
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userid } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    console.log(isChat);
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userid],
      };
      try {
        const createdChat = await Chat.create(chatData);

        const FullChat = await Chat.findOne({
          _id: createdChat._id,
        }).populate("users", "-password");
        res.status(201).send(FullChat);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Accessing chat failed" });
  }
};

const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send("Please fill all the fields");
  }

  const users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(400).send("More than 2 users are required");
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(201).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!updatedChat){
      return res.status(400);
      throw new Error("Chat not found")
    }else{
      res.status(200).json(updatedChat);
    }
};

const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true
        }
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!added){
        return res.status(400);
        throw new Error("Chat not found")
}else{
    res.status(200).json(added);
}
}

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(400);
    throw new Error("Chat not found");
  } else {
    res.status(200).json(removed);
  }
};
module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };
