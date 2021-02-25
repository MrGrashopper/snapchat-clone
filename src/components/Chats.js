import React, { useState, useEffect } from 'react';
import { Avatar } from "@material-ui/core";
import '../styling/Chats.scss';
import SearchIcon from '@material-ui/icons/Search';
import SmsIcon from '@material-ui/icons/Sms';
import { db, auth } from "../firebase";
import Chat from "./Chat";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from "react-router-dom";

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
        setPosts(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
    }, []);

    const takeSnap = () => {
        history.push("/");
    }

    return (
        <div classnName="chats">
            <div className="chats__header">
                <Avatar 
                    src={user.profilePic} 
                    onClick={() => auth.signOut()}
                    className="chats__avatar" 
                />
                <div className="chats__search">
                    <SearchIcon fontSize="small"/>
                    <input placeholder="Friends" type="text"/>
                </div>
                <SmsIcon fontSize="small"/>
            </div>
            <div className="chats__posts">
                {posts.map(({id, data: {profilePic, username, imageUrl, timestamp, read}}) => (
                    <Chat 
                        key={id}
                        id={id}
                        username={username}
                        imageUrl={imageUrl}
                        timestamp={timestamp}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>
            <div className="chats__footer">
                <RadioButtonUncheckedIcon 
                    className="chats__takePicIcon"
                    onClick={takeSnap}
                    fontSize="large"
                />
            </div>
        </div>

    )
}

export default Chats
