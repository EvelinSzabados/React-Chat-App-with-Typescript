import React, { useContext, useEffect, useState } from 'react';
import { PageHeader, Tooltip, Badge, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';
import { NotificationContext } from '../Context/NotificationContext';
import { StatusColors, Statuses } from '../Context/StatusTypes';
import { ChatContext } from '../Context/ChatContext';
import SearchBar from './SearchBar';
import { ValidLoginContext } from "../Context/ValidLoginContext"
import { useMutation } from '@apollo/client';
import { LOG_OUT } from "../Common/GraphqlQueries";
import { DrawerVisibleContext } from '../Context/DrawerVisibleContext';

export default function Header(props: { dispatch?: any }): JSX.Element {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { notifications } = useContext(NotificationContext);
    const { setValidLogin } = useContext(ValidLoginContext)
    const { setChats } = useContext(ChatContext);
    const { setVisible } = useContext(DrawerVisibleContext)

    const [logOutMutation] = useMutation(LOG_OUT);

    const logout = async (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        setCurrentUser({ id: null, email: null, displayName: null, status: Statuses.OFFLINE });
        logOutMutation()
        setChats([])
        sessionStorage.removeItem('user')
        setValidLogin(false)
    }

    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader style={{ backgroundColor: '#51588E' }}
                ghost={true}
                title={<React.Fragment>

                    <Tooltip key={'Profile'} title="Profile">
                        <Badge offset={[-10, 10]} size="default" count={notifications.filter(notif => notif.reciever?.id === currentUser.id).length}>
                            <Avatar icon={<UserOutlined onClick={(e) => { setVisible(true) }} />} style={{ cursor: 'pointer' }} />
                        </Badge>
                    </Tooltip>

                    <span style={{ color: 'white', marginLeft: '1rem' }}>{"Hello, " + currentUser.displayName}</span>
                    <Badge color={StatusColors[currentUser.status]} style={{ marginLeft: '0.6rem' }}></Badge>
                </React.Fragment>}

                extra={[
                    <SearchBar />,
                    <Tooltip key={'Logout'} placement="bottom" title="Log out">
                        <LogoutOutlined style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }}
                            role="button"
                            onClick={(e) => { logout(e) }} /></Tooltip>
                ]}
            >

            </PageHeader>
        </div>
    )
}
