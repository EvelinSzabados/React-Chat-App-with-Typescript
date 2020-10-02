import styled from '@emotion/styled';


export const DashboardContainer = styled.div`
        margin: 3rem auto 0 auto;
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
`;

export const ChatListItemContainer = styled.div<{ selected: boolean }>((props) => ({
        backgroundColor: props.selected ? '#f2f2f2' : 'white',
        padding: '10px',
        marginTop: '10px',
        borderBottom: '0.7px solig #f2f2',
        cursor: 'pointer'

}));

export const MessageBox = styled.p<{ isFriendSent: boolean }>((props) => ({

        backgroundColor: props.isFriendSent ? '#f2f2f2' : '#51588e',
        float: props.isFriendSent ? 'left' : 'right',
        borderTopLeftRadius: props.isFriendSent ? '20px' : '25px',
        borderTopRightRadius: props.isFriendSent ? '25px' : '20px',
        borderBottomRightRadius: props.isFriendSent ? '20px' : 'none',
        borderBottomLeftRadius: props.isFriendSent ? 'none' : '20px',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        marginRight: props.isFriendSent ? '0' : '10px',
        color: props.isFriendSent ? '#404040' : 'white',
        width: '35%',


}));

export const MessageContainer = styled.div`
        height: 85%;
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
export const Scrollable = styled.div`

        box-sizing: border-box;
        overflow-y:auto;
        min-height: 65vh;
        max-height: 65vh;
        z-index: -1;

`;
export const SubmitButton = styled.button`
        background-color: transparent;
        padding: 0;
        margin: 0;
        border: none;
        outline: none;
`
