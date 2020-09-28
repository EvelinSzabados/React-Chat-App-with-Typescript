import styled from '@emotion/styled';


export const DashboardContent = styled.div`
margin: 3rem auto;
width: 80%;
height: 80vh;
background-color: white;

`;
export const ChatViewContainer = styled.div`
        
        height: 80vh;
        padding:1rem;
        min-width: 100%;
`;

export const ChatListContainer = styled.div`
    padding: 1rem;
    height: 80vh;

`;
export const ChatListItemContainer = styled.div`
    padding: 10px;
 
    margin-top: 5px;
    border-bottom: 0.7px solid #f2f2f2;
`;

export const FriendSent = styled.p`

        float: left;
        clear: both;
        padding: 20px;
        box-sizing: border-box;
        word-wrap: break-word;
        margin-top: 10px;
        background-color: #d6d6d6;
        color: #303030;
        width: 35%;
        border-top-left-radius: 20px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 20px;

`;
export const UserSent = styled.p`

        float: right;
        clear: both;
        padding: 20px;
        box-sizing: border-box;
        word-wrap: break-word;
        margin-top: 10px;
        margin-right:10px;
        background-color: #51588e;
        color: white;
        width: 35%;
        border-top-right-radius: 20px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 20px;
`;

export const MessageContainer = styled.div`
        height: 95%;
        box-sizing: border-box;
        overflow-y:auto;
`;

export const InputContainer = styled.div`
        width: 100%;      
`;
export const MessageInput = styled.input`
        width: 90%;
        border: 0.7px solid #ccc;
        outline: none;
        border-radius: 20px;
        padding: 5px 20px;
        color: #404040;
`;