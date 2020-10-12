import React from 'react'
import { Avatar, List, Badge, Tag, Input, Popconfirm } from 'antd';
import { MessageOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

export default function Friends() {
    const { Search } = Input;

    const data = [
        {
            title: 'Friend1',
        },
        {
            title: 'Friend2',
        },
        {
            title: 'Friend3',
        },
        {
            title: 'Friend4',
        },
    ];

    return (
        <React.Fragment>
            <Search
                placeholder="Search friends"
                onSearch={value => console.log(value)}
            />
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={
                        [<Tag color="geekblue" style={{ cursor: 'pointer' }} icon={<MessageOutlined />}>Message</Tag>,
                        <Popconfirm title="Are you sure？" onConfirm={() => { console.log(`Deleted ${item.title}`) }}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                            <Tag style={{ cursor: 'pointer' }} icon={<DeleteOutlined />} color="error">Delete</Tag>
                        </Popconfirm>,

                        ]
                    }>
                        <List.Item.Meta
                            avatar={<Badge offset={[0, 30]} status="success"><Avatar>F</Avatar></Badge>}
                            title={item.title}
                            description={item.title + "@gmail.com"}

                        />
                    </List.Item>
                )}
            />
        </React.Fragment>
    )
}
