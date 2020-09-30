import React, { useContext } from 'react';
import { PageHeader } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';

export default function Header(): JSX.Element {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const logout = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        setCurrentUser({ id: null, email: null, displayName: null });

    }

    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader style={{ backgroundColor: '#51588E' }}
                ghost={true}
                title={<span style={{ color: 'white' }}>{"Hello, " + currentUser.displayName}</span>}

                avatar={{ icon: <UserOutlined /> }}
                extra={[
                    <LogoutOutlined style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }}
                        role="button"
                        onClick={(e) => { logout(e) }} />
                ]}
            >
            </PageHeader>
        </div>
    )
}
