import React, { useEffect } from 'react';
import './styling/App.scss';
import WebcamCapture  from "./components/WebcamCapture";
import Preview  from "./components/Preview";
import Chats  from "./components/Chats";
import ChatView  from "./components/ChatView";
import Login  from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { login, logout, selectUser } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import iphone from './images/iphone.png';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <img 
            className="app__logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c536.png" 
            alt=""
          />
          <div className="app__body">
            {/* <img src={iphone} className="app__phone" alt=""/> */}
            <Switch> 
              <Route path="/chats/view">
                <ChatView  />
              </Route>
              <Route path="/preview">
                <Preview  />
              </Route>
              <Route path="/chats">
                <Chats  />
              </Route>
              <Route exact path="/">
                <WebcamCapture />
              </Route>
            </Switch>
          </div>
          </>
        )}
    </Router>
    </div>
  );
}

export default App;
