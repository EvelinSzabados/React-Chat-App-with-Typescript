import { gql } from '@apollo/client';

export const GET_USER = gql`
query currentUser {
    currentUser{
        id,
        displayName,
        email,
        status,
        profilePictureUrl,
        friends{
            users{id,displayName,email,status,profilePictureUrl}
        }
    }
}`;