import React, { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useParams } from "react-router-dom";
import { getStreamToken } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import ChatLoader from "../components/ChatLoader";
import toast from "react-hot-toast";
import CallButton from "../components/CallButton";
import {
  Channel,
  ChannelHeader,
  Chat,
  Window,
  MessageList,
  Thread,
  // MessageComposerUI,
} from "stream-chat-react";

import { StreamChat } from "stream-chat";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

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
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVedioCall}/>
            <Window>
              <ChannelHeader />
              <MessageList />



              {/* <MessageComposerUI /> */}


            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
