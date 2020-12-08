import React, { useState, useContext } from 'react'
import { Avatar, Popover, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { UserContext } from "../Context/UserContext"
import { useMutation } from '@apollo/client';
import { UPLOAD_PHOTO } from "../Common/GraphqlQueries";


export default function ProfilePicture() {
    const { currentUser } = useContext(UserContext);
    const [profilePicUrl, setProfilePicUrl] = useState(currentUser.profilePictureUrl)
    const [uploadPhoto] = useMutation(UPLOAD_PHOTO);

    async function upload(files: FileList | null) {
        if (files && files[0]) {
            await uploadPhoto({ variables: { photo: URL.createObjectURL(files[0]) } });
            setProfilePicUrl(URL.createObjectURL(files[0]))
            message.success(`${files[0].name} file uploaded successfully`, 3);
        }
    }

    return (
        <Popover placement="left" content={
            <label style={{ width: '50%', cursor: 'pointer' }}>
                <UploadOutlined />
                <span style={{ marginLeft: '5px' }}>Change profile picture</span>
                <input style={{ display: "none" }} type="file" name="file" onChange={(e) => upload(e.target.files)} />
            </label>
        }>
            <Avatar size={64} icon={<UserOutlined />} src={profilePicUrl} style={{ margin: '0 auto', cursor: 'pointer' }} />
        </Popover>
    )
}
