import React, { useState, useContext } from 'react';
import { Avatar, Button, Popover, Upload, message, Tabs, List } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { ProfileContainer, NameContainer, ProfileDataContainer, ProfileDataLabel, ProfileDataItem } from './Style';
import { UserContext } from '../Context/UserContext';

export default function DrawerContent() {
    const [profilePicUrl, setProfilePicUrl] = useState('')
    const { currentUser } = useContext(UserContext);

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
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
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

                <Tabs defaultActiveKey="1" type="card" size='middle'>
                    <TabPane tab="Friends" key="1">
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab="Notifications" key="2">
                        No notifications.
                    </TabPane>
                    <TabPane tab="Pending friend requests" key="3">
                        No pending friend requests.
                    </TabPane>
                </Tabs>
            </ProfileDataContainer>

        </ProfileContainer>
    )
}
