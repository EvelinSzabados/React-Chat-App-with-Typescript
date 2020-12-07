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

export const GET_CHATS = gql`
    query chats{
        chats{
            id,
            lastUpdated,
            messages{
                id,
                text,
                sender{id,email,displayName,status,profilePictureUrl}},
                users{id,email,displayName,status,profilePictureUrl}
            }                  
    }`;