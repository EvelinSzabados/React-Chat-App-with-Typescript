import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext';
import WithLoading from '../Common/WithLoading';
import DashboardContent from './DashboardContent';

export default function Dashboard() {

    const { chats } = useContext(ChatContext);
    const LoadingDashboard = WithLoading(DashboardContent);

    return (
        <LoadingDashboard isLoading={chats === null} />
    )

}





