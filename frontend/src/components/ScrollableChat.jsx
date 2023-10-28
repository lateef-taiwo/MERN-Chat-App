import React from "react";
import { chatState } from "../Context/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = chatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div key={m._id}>
            <div
              style={{
                display: "flex",
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 20,
              }}
              className="relative"
            >
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "orange" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  borderRadius: "10px",
                  padding: "5px 15px",
                  maxWidth: "70%",
                }}
                className="relative flex items-center justify-between group"
              >
                <span>{m.content}</span>
                <span className="text-[9px] ml-2 self-end">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                  })}
                </span>
                <span
                  style={{
                    backgroundColor: `radial-gradient(ellipse at center, rgba(255, 165, 0, 0.7) 0%, ${
                      m.sender._id === user._id ? "orange" : "#B9F5D0"
                    } 100%)`,
                    borderRadius: "10px",
                  }}
                  className="material-symbols-outlined absolute text-[20px] top-0 right-1 group-hover:visible invisible"
                >
                  expand_more
                </span>
              </span>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
