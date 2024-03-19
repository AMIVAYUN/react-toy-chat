/**
 * v0 by Vercel.
 * @see https://v0.dev/t/asknnVRsSMc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useEffect, useState } from 'react';
import './Chat.css';
import { Link, useParams } from "react-router-dom";
import SockJS from 'sockjs-client';
import axios from 'axios';
const ChatComponent = () => {
  const [ chat, setChat ] = useState([]);
  const updateChatting = ( ch ) => {
    const nextChat = [ ...chat, ch ];
    setChat( nextChat );
  }

  const roomId = useParams();
  useEffect( () => {
    getChatList();
  }, [])
  const getChatList = async () =>{

    const chatList = await axios.get( `http://localhost:8080/room/chat/${roomId['roomId']}`);
    chatList['data'].forEach(element => {
      let tag = <div> {element['content']}</div>
      updateChatting( tag );
    });

    StompSetting();
  }

  const StompSetting = () => {
    let socket = new SockJS('http://localhost:8080/ws');
    console.log( socket )
    
  }
  return (
    <div>
    <div className="chat-container">
        <div className="chat-header">
            <h2>하늘색 채팅방</h2>
        </div>
        <div className="chat-messages" id="chatMessages">
          { chat }
        </div>
        <div className="chat-form">
            <input type="text" id="chatInput" placeholder="메시지를 입력하세요..."/>
            <button id="sendBtn">전송</button>
        </div>
    </div>
</div>

  )
}  
export default ChatComponent;









