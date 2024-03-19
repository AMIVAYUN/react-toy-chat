import './ChatList.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ChatListComponent = () => {
    let navigate = useNavigate();
    const OpenChatRoom = ( roomId ) => {
        navigate(`/room/${roomId}`);
    }
    useEffect( () => {
        loadChatList();
    }, [])

    const [ tagList, setTagList ] = useState([]);
    
    const updateTagList = ( tag ) => {
        const nextList = [ ...tagList, tag ]
        setTagList( nextList );
    }

    const getLoginTestMemberId = async () => {
        const url = 'http://localhost:8080/member/chat/test/login';
        const value = await axios.get( url )
        .then( res => {
            let member = res['data'];
            return member['memberId'];
        })

        return value;
    }
    const loadChatList = async () => {
        const memberId = await getLoginTestMemberId();

        
        const url = `http://localhost:8080/room?id=${memberId}`

        axios.get( url,).then( res => {
            res['data'].forEach(element => {
                let tag = <li class="chat-list-item" onClick={ () => { OpenChatRoom( element['chatRoomId'] )}}>${element['title']} 방장: ${element['member']['nickname']}</li>
                console.log( tag );
                updateTagList( tag );
            });
            console.log( tagList );
        })
        
    }

    return (
        <>
        <ul className="chat-list">
            {tagList}   
        
        </ul>
        </>
    )
}
export default ChatListComponent