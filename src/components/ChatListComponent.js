import './ChatList.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ChatListComponent = () => {
    //원래는 저장소써서 member 유지할테지만 지금 없으니깐 test로 작성했음. props 활용해서
    let memberId;
    let navigate = useNavigate();
    const OpenChatRoom = ( roomId ) => {
        navigate(`/room/${roomId}`, { 'state' : memberId });
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
    const loadChatList = async (

    ) => {
        memberId = await getLoginTestMemberId();
        console.log("memberId:", memberId)
        
        const url = `http://localhost:8080/chat/room?memberId=${memberId}`

        axios.get( url,).then( res => {
            console.log( res['data'])
            res['data'].forEach(element => {
                let tag = <li class="chat-list-item" onClick={ () => { OpenChatRoom( element['chatRoomId'] )}}>${element['title']} 방장: ${element['nickname']}</li>
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