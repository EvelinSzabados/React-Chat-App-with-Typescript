import React from 'react'

import { Layout, List, Avatar } from 'antd';
import { Row, Col } from 'antd';


export default function Dashboard() {

    const data = [
        {
            friend: 'Tamás Sallai',
            displayMessage: 'How are you?'
        },
    ];

    return (
        <Layout style={{ height: '100vh' }}>
            <div style={{ margin: '2rem auto', width: '80%', height: '80vh', backgroundColor: 'white' }}>
                <Row>
                    <Col span={6} style={{ padding: '1rem' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar size={40}>{item.friend[0]}</Avatar>}
                                        title={item.friend}
                                        description={item.displayMessage}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>ChatView</Col>
                </Row>
            </div>
        </Layout>
    )
}



