import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { chatState } from "../Context/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { Avatar, MenuButton, MenuItem, MenuList, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = chatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div key={m._id} className="overflow-visible relative">
            <div style={{ display: "flex" }} className="relative">
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
                    m.sender._id === user._id ? "orange" : "#52a2f3"
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
                <div className=" top-0 right-0 absolute">
                  {/* <Menu className="" style={{ position: "relative" }}>
                    <MenuButton>
                      <span
                        style={{
                          backgroundColor: `${
                            m.sender._id === user._id ? "orange" : "#52a2f3"
                          }`,
                        }}
                        className="material-symbols-outlined  more rounded-full cursor-pointer shadow-2xl"
                      >
                        expand_more
                      </span>
                    </MenuButton>
                    <MenuList className="absolute right-[-24px]">
                      <MenuItem>Edit</MenuItem>
                    </MenuList>
                  </Menu> */}
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
              </span>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
