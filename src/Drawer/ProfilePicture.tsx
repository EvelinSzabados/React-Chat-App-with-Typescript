import React, { useState } from 'react'
import { Avatar, Popover, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

export default function ProfilePicture() {
    const [profilePicUrl, setProfilePicUrl] = useState('')

    function upload(files: FileList | null) {
        if (files && files[0]) {
            setProfilePicUrl(URL.createObjectURL(files[0]))
            message.success(`${files[0].name} file uploaded successfully`, 3);
        }
    }

    return (
        <Popover placement="left" content={
            <label style={{ width: '50%', cursor: 'pointer' }}>
                <UploadOutlined />
                <span style={{ marginLeft: '5px' }}>Change profile picture</span>
                <input style={{ display: "none" }} type="file" onChange={(e) => { upload(e.target.files) }} />
            </label>
        }>
            <Avatar size={64} icon={<UserOutlined />} src={profilePicUrl} style={{ margin: '0 auto', cursor: 'pointer' }} />
        </Popover>
    )
}
