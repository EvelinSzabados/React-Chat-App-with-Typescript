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

export const GET_REQUESTS = gql`
    query requests{
        requests{
            id,
            sender{id,email,displayName,status,profilePictureUrl},
            reciever{id,email,displayName,status,profilePictureUrl}                          
    }
    }
`

export const NOTIF_SUBSCRIPTION = gql`
subscription sendRequest {
    sendRequest {
        id,
        sender{id,email,displayName,status,profilePictureUrl},
        reciever{id,email,displayName,status,profilePictureUrl},

    } 
}
`;
