import React, { useContext } from 'react';
import { Tabs, Badge, Tag, Select } from 'antd';
import { ProfileContainer, NameContainer, ProfileDataContainer, ProfileDataLabel, ProfileDataItem } from '../Drawer/Style';
import { UserContext } from '../Context/UserContext';
import ProfilePicture from './ProfilePicture';
import Friends from './Friends';
import Notifications from './Notifications';
import PendingRequests from './PendingRequests'
import { NotificationContext } from '../Context/NotificationContext';
import { Statuses, StatusColors } from '../Context/StatusTypes';

export default function DrawerContent() {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { notifications } = useContext(NotificationContext);

    const options = [
        { label: <Tag color={StatusColors.AVAILABLE}>Active</Tag>, value: Statuses.AVAILABLE },
        { label: <Tag color={StatusColors.BUSY}>Busy</Tag>, value: Statuses.BUSY },
        { label: <Tag color={StatusColors.OFFLINE}>Offline</Tag>, value: Statuses.OFFLINE }];

    const { TabPane } = Tabs;

    return (
        <ProfileContainer>
            <ProfilePicture />

            <NameContainer>{currentUser.displayName}</NameContainer>
            <ProfileDataContainer>
                <ProfileDataItem><ProfileDataLabel>Email:</ProfileDataLabel>{currentUser.email}</ProfileDataItem>
                <ProfileDataItem><ProfileDataLabel>Status:</ProfileDataLabel>

                    <Select
                        showArrow
                        bordered={false}
                        defaultValue={currentUser.status}
                        style={{ width: '20%', cursor: 'pointer' }}
                        options={options}
                        onSelect={(value: Statuses) => {
                            const user = currentUser;
                            user.status = value;
                            setCurrentUser(user);
                        }}
                    />


                </ProfileDataItem>

                <Tabs animated={true} tabPosition="top" defaultActiveKey="1" type="card" size='large'>
                    <TabPane tab="Friends" key="1">
                        <Friends />
                    </TabPane>
                    <TabPane tab={<span> Notifications <Badge size="small"
                        count={notifications.length > 0 ? notifications.filter(notif => notif.reciever.id === currentUser.id).length : 0} /></span>} key="2">
                        <Notifications />
                    </TabPane>
                    <TabPane tab={<span> Pending Friend requests <Badge size="small" style={{ backgroundColor: '#51588E' }}
                        count={notifications.length > 0 ? notifications.filter(notif => notif.sender.id === currentUser.id).length : 0} /></span>} key="3">
                        <PendingRequests />
                    </TabPane>
                </Tabs>
            </ProfileDataContainer>

        </ProfileContainer>
    )
}
