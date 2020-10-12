import React, { useContext } from 'react';
import { Tabs, Badge, Tag } from 'antd';
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


    const { TabPane } = Tabs;

    return (
        <ProfileContainer>
            <ProfilePicture />

            <NameContainer>{currentUser.displayName}</NameContainer>
            <ProfileDataContainer>
                <ProfileDataItem><ProfileDataLabel>Email:</ProfileDataLabel>{currentUser.email}</ProfileDataItem>
                <ProfileDataItem><ProfileDataLabel>Member since:</ProfileDataLabel>2020.08.23.</ProfileDataItem>
                <ProfileDataItem><ProfileDataLabel>Status:</ProfileDataLabel><Tag color="green">Active</Tag></ProfileDataItem>

                <Tabs animated={true} tabPosition="top" defaultActiveKey="1" type="card" size='large'>
                    <TabPane tab="Friends" key="1">
                        <Friends />
                    </TabPane>
                    <TabPane tab={<span> Notifications <Badge size="small" count={notifications.length} /></span>} key="2">
                        <Notifications />
                    </TabPane>
                    <TabPane tab="Pending friend requests" key="3">
                        <PendingRequests />
                    </TabPane>
                </Tabs>
            </ProfileDataContainer>

        </ProfileContainer>
    )
}
