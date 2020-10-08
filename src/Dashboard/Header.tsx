import React, { useContext } from 'react';
import { PageHeader, Tooltip, Badge, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';

export default function Header(props: { setVisible: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const setVisible = props.setVisible;

    const logout = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        setCurrentUser({ id: null, email: null, displayName: null });

    }

    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader style={{ backgroundColor: '#51588E' }}
                ghost={true}
                title={<React.Fragment>
                    <Tooltip key={'Profile'} title="Profile">
                        <Badge offset={[-10, 10]} size="default" count={2}>
                            <Avatar icon={<UserOutlined onClick={(e) => { setVisible(true) }} />} style={{ cursor: 'pointer' }} />
                        </Badge>
                    </Tooltip>
                    <span style={{ color: 'white', marginLeft: '1rem' }}>{"Hello, " + currentUser.displayName}</span>
                </React.Fragment>}

                extra={[
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
