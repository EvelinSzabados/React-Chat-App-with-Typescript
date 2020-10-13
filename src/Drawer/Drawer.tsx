import React, { useContext } from 'react';
import { Tabs, Badge, Tag, Select } from 'antd';
import { ProfileContainer, NameContainer, ProfileDataContainer, ProfileDataLabel, ProfileDataItem } from '../Drawer/Style';
import { UserContext } from '../Context/UserContext';
import ProfilePicture from './ProfilePicture';
import Friends from './Friends';
import Notifications from './Notifications';
import PendingRequests from './PendingRequests'
import { NotificationContext } from '../Context/NotificationContext';

export default function DrawerContent() {

    const { currentUser } = useContext(UserContext);
    const { notifications } = useContext(NotificationContext);
    const options = [
        { label: <Tag color="green">Active</Tag>, value: 'active' },
        { label: <Tag color="gold">Busy</Tag>, value: 'busy' },
        { label: <Tag color="purple">Offline</Tag>, value: 'offline' }];

    const { TabPane } = Tabs;

    return (
        <ProfileContainer>
            <ProfilePicture />

            <NameContainer>{currentUser.displayName}</NameContainer>
            <ProfileDataContainer>
                <ProfileDataItem><ProfileDataLabel>Email:</ProfileDataLabel>{currentUser.email}</ProfileDataItem>
                <ProfileDataItem><ProfileDataLabel>Member since:</ProfileDataLabel>2020.08.23.</ProfileDataItem>
                <ProfileDataItem><ProfileDataLabel>Status:</ProfileDataLabel>

                    <Select
                        showArrow
                        bordered={false}
                        defaultValue={['active']}
                        style={{ width: '20%', cursor: 'pointer' }}
                        options={options}
                    />


                </ProfileDataItem>

                <Tabs animated={true} tabPosition="top" defaultActiveKey="1" type="card" size='large'>
                    <TabPane tab="Friends" key="1">
                        <Friends />
                    </TabPane>
                    <TabPane tab={<span> Notifications <Badge size="small"
                        count={notifications.filter(notif => notif.reciever.id === currentUser.id).length} /></span>} key="2">
                        <Notifications />
                    </TabPane>
                    <TabPane tab={<span> Pending Friend requests <Badge size="small"
                        count={notifications.filter(notif => notif.sender.id === currentUser.id).length} /></span>} key="3">
                        <PendingRequests />
                    </TabPane>
                </Tabs>
            </ProfileDataContainer>

        </ProfileContainer>
    )
}
