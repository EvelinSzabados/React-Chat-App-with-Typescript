import React, { useState } from 'react'
import { Avatar, Button, Popover, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


export default function ProfilePicture() {
    const [profilePicUrl, setProfilePicUrl] = useState('')

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(fileObj: any) {

            if (fileObj.file.status === 'done') {
                message.success(`${fileObj.file.name} file uploaded successfully`);

                setProfilePicUrl(fileObj.file.response.url)

            } else if (fileObj.file.status === 'error') {
                message.error(`${fileObj.file.name} file upload failed.`);
            }

        },
        onPreview: async (file: any) => {
            let src = file.url;
            if (!src) {
                src = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
        },

    };
    return (
        <Popover placement="left" content={
            <ImgCrop rotate>
                <Upload showUploadList={false} {...props}>

                    <Button style={{ width: '50%', margin: '0 auto', border: 'none' }} icon={<UploadOutlined />} size='middle'>
                        Change profile picture
            </Button>
                </Upload>
            </ImgCrop>
        }>

            <Avatar size={64} icon={<UserOutlined />} src={profilePicUrl} style={{ margin: '0 auto', cursor: 'pointer' }} />
        </Popover>
    )
}
