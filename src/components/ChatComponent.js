/**
 * v0 by Vercel.
 * @see https://v0.dev/t/asknnVRsSMc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useEffect, useRef, useState } from 'react';
import './Chat.css';
import { Link, useLocation, useParams } from "react-router-dom";
import SockJS from 'sockjs-client';
import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
const ChatComponent = () => {
  const { state } = useLocation();
  const [ chat, setChat ] = useState([]);
  const stompClient = useRef( null );
  const updateChatting = (ch) => {
    setChat((prevChat) => prevChat.concat(ch));
  };
  
  const [ value, setValue ] = useState("");

  const roomId = useParams();
  useEffect( () => {
    getChatList();
    console.log("memberId", state );
    console.log('roomId', roomId );
  }, [])


  const getChatList = async () =>{

    const chatList = await axios.get( `http://localhost:8080/room/chat/${roomId['roomId']}`);
    chatList['data'].forEach(element => {
      updateChatting( element['content'])
    });
    console.log( 'chat', chat );
    StompSetting();
  }
  const onChangeInputValue = ( e ) => {
    setValue( e.target.value );
  } 

  const StompSetting = () => {
    let socket = new SockJS('http://localhost:8080/ws');
    stompClient.current= Stomp.over(socket);
    stompClient.current.connect({}, function( frame ){
      console.log("connected ", frame );
      const dest = `/chat-room/1`;
      console.log( dest );
      stompClient.current.subscribe( dest, function( response ){
        console.log('왔어!!!!', response.body );
        let obj = JSON.parse( response.body );
        let tag = <div> {obj['content']}</div>
      updateChatting( tag );
      })
    })

    console.log( 'bef stompClient', stompClient );
    
  }

  const send = () => {
    console.log( '보낼 메시지 ', value );
    console.log( 'stompClient', stompClient );
    const dest = `/send/${roomId['roomId']}`;
    stompClient.current.send( dest, {},
      JSON.stringify(
        {
          memberId: state,
          content: value,
          type : 'message',
          fileId: undefined
        }
      )
    )
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
            <input type="text" id="chatInput" placeholder="메시지를 입력하세요..." value={value} onChange={ onChangeInputValue }/>
            <button id="sendBtn" onClick={ send }>전송</button>
        </div>
    </div>
</div>

  )
}  
export default ChatComponent;









