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
            users{id,email,displayName,status,profilePictureUrl},
            messages{
                id,
                text,
                sender{id,email,displayName,status,profilePictureUrl}},
                
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
export const NEWCHAT_SUBSCRIPTION = gql`
    subscription newChat {
        newChat{
            id,
            lastUpdated,
            users{id,email,displayName,status,profilePictureUrl},
            messages{
                id,
                text,
                sender{id,email,displayName,status,profilePictureUrl}
            },
                    
        }
    }

`;
export const DECLINE_REQUEST = gql`
    mutation declineRequest($requestId: ID!) {
        declineRequest(requestId: $requestId){id}
    }`;

export const ACCEPT_REQUEST = gql`
    mutation acceptRequest($requestId: ID!) {
        acceptRequest(requestId: $requestId){id}
    }`;

export const NEW_CHAT = gql`
    mutation newChat($users: [ID!]!){
        newChat(users: $users){
            id,
            lastUpdated,
            users{id,email,displayName,status,profilePictureUrl},
            messages{
                id,
                text,
                sender{id,email,displayName,status,profilePictureUrl}},
                
            }
        }
    
`;

export const UPLOAD_PHOTO = gql`
    mutation uploadPhoto($photo: String!){
        uploadPhoto(photo: $photo)
    }
`
export const LOGIN_MUTATION = gql`
mutation login($email: String! ,$password: String!) {
    login(email: $email, password: $password) {
        token,
        user{id,email,displayName,profilePictureUrl,status}
    }
}
`;


export const SIGNUP_MUTATION = gql`
mutation signup($email: String! ,$password: String!,$displayName: String!) {
    signup(email: $email, password: $password,displayName: $displayName) {
        token,
        user{id,email,displayName,profilePictureUrl,status}
    }
}
`;

export const ALL_USERS_QUERY = gql`
    query users{
        users{
            id,
            email,
            displayName,
            status,
            profilePictureUrl,
            friends{
                users{id,displayName,email,status,profilePictureUrl}
            }
        }
    }
`;