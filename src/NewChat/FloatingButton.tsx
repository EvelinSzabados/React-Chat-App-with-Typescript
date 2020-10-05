import React from 'react';
import { FloatingBtn } from './Style';
import { Popover, Tooltip } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import SearchFriend from './SearchFriend';


export default function FloatingButton() {
    return (
        <Tooltip title="New chat">
            <Popover placement="left" title={"Select a friend"} content={<SearchFriend />} trigger="click">
                <FloatingBtn><PlusCircleFilled style={{ fontSize: '35px' }} /></FloatingBtn>
            </Popover>
        </Tooltip>

    )
}
