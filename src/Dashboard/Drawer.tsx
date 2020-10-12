import React, { useState, useContext } from 'react';
import { Avatar, Button, Popover, Upload, message, Tabs, List, Badge, Tag, Input } from 'antd';
import { UserOutlined, UploadOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import { ProfileContainer, NameContainer, ProfileDataContainer, ProfileDataLabel, ProfileDataItem } from './Style';
import { UserContext } from '../Context/UserContext';

export default function DrawerContent() {
    const [profilePicUrl, setProfilePicUrl] = useState('')
    const { currentUser } = useContext(UserContext);

    const { Search } = Input;
    const { TabPane } = Tabs;
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setProfilePicUrl(info.file.response.url)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
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
        <ProfileContainer>
            <Popover placement="left" content={
                <Upload showUploadList={false} {...props}>
                    <Button style={{ width: '50%', margin: '0 auto', border: 'none' }} icon={<UploadOutlined />} size='middle'>
                        Change profile picture
                </Button>
                </Upload>
            }>

                <Avatar size={64} icon={<UserOutlined />} src={profilePicUrl} style={{ margin: '0 auto', cursor: 'pointer' }} />
            </Popover>

            <NameContainer>{currentUser.displayName}</NameContainer>
            <ProfileDataContainer>
                <ProfileDataItem><ProfileDataLabel>Email:</ProfileDataLabel>{currentUser.email}</ProfileDataItem>
                <ProfileDataItem><ProfileDataLabel>Member since:</ProfileDataLabel>2020.08.23.</ProfileDataItem>
                <ProfileDataItem><ProfileDataLabel>Status:</ProfileDataLabel><Tag color="green">Active</Tag></ProfileDataItem>

                <Tabs defaultActiveKey="1" type="card" size='large'>
                    <TabPane tab="Friends" key="1">
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
                                    <Tag style={{ cursor: 'pointer' }} icon={<DeleteOutlined />} color="error">Delete</Tag>
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
                    </TabPane>
                    <TabPane tab={<Badge size="small" offset={[11, 0]} count={2}> Notifications </Badge>} key="2">
                        No notifications
                    </TabPane>
                    <TabPane tab="Pending friend requests" key="3">
                        No pending friend requests.
                    </TabPane>
                </Tabs>
            </ProfileDataContainer>

        </ProfileContainer>
    )
}
