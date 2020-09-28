import React from 'react'
import { Layout, List, Avatar } from 'antd';
import { Row, Col } from 'antd';
import { ChatViewContainer, DashboardContent, ChatListContainer, ChatListItemContainer } from './Style';

export default function Dashboard() {

    const data = [
        {
            friend: 'Tamás Sallai',
            displayMessage: 'How are you?'
        },
        {
            friend: 'Tamás Sallai',
            displayMessage: 'How are you?'
        },
    ];

    return (
        <Layout style={{ height: '100vh' }}>
            <DashboardContent>
                <Row>
                    <Col span={6}>
                        <ChatListContainer>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <ChatListItemContainer>
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar size={40} style={{ backgroundColor: '#51588e' }}>{item.friend[0]}</Avatar>}
                                                title={item.friend}
                                                description={item.displayMessage}
                                            />
                                        </List.Item>
                                    </ChatListItemContainer>
                                )}
                            />
                        </ChatListContainer>
                    </Col>
                    <Col span={18}>
                        <ChatViewContainer>
                            <p>Container</p>
                        </ChatViewContainer></Col>
                </Row>
            </DashboardContent>
        </Layout>
    )
}



