import React, { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useParams } from "react-router-dom";
import { getStreamToken } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import ChatLoader from "../components/ChatLoader";
import toast from "react-hot-toast";
import {
  Channel,
  Chat,
  Window,
  MessageList,
  Thread,
  MessageComposer,
  useChannelStateContext,
  useChannelPreviewInfo,
  useTypingContext,
} from "stream-chat-react";
import { VideoIcon } from "lucide-react";
import CallButton from "../components/CallButton";
import { StreamChat } from "stream-chat";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CustomChannelHeader = ({ handleVideoCall, authUser }) => {
  const { channel, channelConfig } = useChannelStateContext();
  const { displayImage, displayTitle } = useChannelPreviewInfo({ channel });
  const { typing = {} } = useTypingContext();

  const hasTyping = channelConfig?.typing_events !== false && 
    Object.values(typing).some(({ parent_id }) => !parent_id);

  const otherMemberId = Object.keys(channel?.state?.members || {}).find(
    (id) => id !== authUser?._id?.toString()
  );
  const otherMember = otherMemberId ? channel?.state?.members[otherMemberId]?.user : null;
  const isOnline = otherMember?.online;

  return (
    <div className="str-chat__channel-header w-full z-20">
      {/* Left-most corner: Profile pic (Avatar) */}
      <div className="str-chat__channel-header__start flex items-center">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={displayImage || "/placeholder.png"}
              alt={displayTitle || "User Avatar"}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Center: Title & status */}
      <div className="str-chat__channel-header__data">
        <span className="str-chat__channel-header__data__title">
          {displayTitle}
        </span>
        <span className="str-chat__channel-header__data__subtitle">
          {hasTyping ? "Typing..." : (isOnline ? "Online" : "Offline")}
        </span>
      </div>

      {/* Right-most corner: Video call button */}
      <div className="str-chat__channel-header__end">
        <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white flex items-center justify-center">
          <VideoIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(false);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, //this will run only when authuser is available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;
      try {
        console.log("Initializing stream chat client...");
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id.toString(),
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token,
        );

        //Create a channel id by sorting the user ids
        const channelId = [authUser._id.toString(), targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChannel(currChannel);
        setChatClient(client);
      } catch (err) {
        console.error("Error initializing chat:", err);
        toast.error("Could not connect to chat. Please try again");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData,authUser,targetUserId]);

  const handleVedioCall = ()=>{
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text:`I've started a video call. Join me here: ${callUrl}`
      });
      toast.success("video call link sent successfully!")
    }
  }

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
            <Window>
              <CustomChannelHeader handleVideoCall={handleVedioCall} authUser={authUser} />
              <MessageList />
              <MessageComposer />
            </Window>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
