import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import { UserProvider } from './Context/UserContext';
import { ChatProvider } from './Context/ChatContext';
import { SelectedChatProvider } from './Context/SelectedChatContext';
import { PrivateRoute } from './Common/PrivateRoute';
import { FriendProvider } from './Context/FriendContext';
import { NotificationProvider } from './Context/NotificationContext';
import { DrawerVisibleProvider } from './Context/DrawerVisibleContext';

function App(): JSX.Element {

  return (
    <UserProvider>
      <SelectedChatProvider>
        <ChatProvider>
          <Router>
            <Route exact path="/" component={Login}></Route>
            <FriendProvider>
              <NotificationProvider>
                <DrawerVisibleProvider>
                  <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
                </DrawerVisibleProvider>
              </NotificationProvider>
            </FriendProvider>
          </Router>
        </ChatProvider>
      </SelectedChatProvider>
    </UserProvider>
  );
}

export default App;
