const Chat = require("../models/chats.model");
const { User } = require("../models/user.model");

const accessChat = async (req, res) => {
    const {userid} = req.body;

    if (!userid) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }

    var isChat = await Chat.findOne({
      isGroup: false,
      $and: [
        { users: { elemMatch: { $eq: req.user._id } } },
        { users: { elemMatch: { $eq: userid } } },
      ],
    })
      .populate("users", "password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "name pic email" });

    if (isChat.length) {
        res.send(isChat[0]);
    }else{
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userid],
        }
        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findById({_id: createdChat._id}).populate("users", "password");
            res.status(201).send(FullChat);
        } catch (error) {
            console.log(error);
        }
    }

    };

    module.exports = { accessChat };