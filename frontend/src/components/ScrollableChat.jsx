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
            <div style={{ display: "flex" }}>
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
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "10px",
                  padding: "5px 15px",
                  maxWidth: "70%",
                }}
                className="relative"
              >
                <p>{m.content}</p>
                {/* <span className="material-symbols-outlined absolute top-0 right-0 visible hover:invisible">
                  expand_more
                </span> */}
              </span>
            </div>
            <div className="flex mt-[-10px] justify-between">
              <div className="ml-auto">
                <sub className="text-[9px]">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                  })}
                </sub>
              </div>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
