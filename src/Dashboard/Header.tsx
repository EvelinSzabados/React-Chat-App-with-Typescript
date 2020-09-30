import React, { useContext } from 'react';
import { PageHeader } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';
export default function Header() {

    const { currentUser } = useContext(UserContext);
    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader style={{ backgroundColor: '#51588E' }}
                ghost={true}
                title={<span style={{ color: 'white' }}>{"Hello, " + currentUser.displayName}</span>}

                avatar={{ icon: <UserOutlined /> }}
                extra={[
                    <LogoutOutlined style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }} role="button" />
                ]}
            >
            </PageHeader>
        </div>
    )
}
