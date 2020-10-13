import React, { useState } from 'react'
import { Avatar, Button, Popover, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

export default function ProfilePicture() {
    const [profilePicUrl, setProfilePicUrl] = useState('')
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

        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
        },
    };
    return (
        <Popover placement="left" content={
            <Upload showUploadList={false} {...props}>
                <Button style={{ width: '50%', margin: '0 auto', border: 'none' }} icon={<UploadOutlined />} size='middle'>
                    Change profile picture
            </Button>
            </Upload>
        }>

            <Avatar size={64} icon={<UserOutlined />} src={profilePicUrl} style={{ margin: '0 auto', cursor: 'pointer' }} />
        </Popover>
    )
}
