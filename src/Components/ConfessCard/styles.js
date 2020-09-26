import styled from 'styled-components';
import { Paper, TextareaAutosize , Avatar} from '@material-ui/core'

export const Container = styled(Paper)`
    &&& {
        padding : 1rem 1rem 0.5rem;
        margin-top : 10px;
        width : 100%;
        border-radius : 7px;
        @media(max-width : 768px) {
           border-radius : 0px;
        }
     }
     .confess-text {
        padding : 1rem 0px 0.2rem;
        overflow-x : auto;
        line-height : 1.3rem;
        font-size : 1rem;
        white-space: break-spaces;
        word-break: break-word;
     }
     .action {
         display : flex;
         align-items : center;
         margin-top : 10px;
     }

`;
export const TopBar = styled.div`
   display : flex;
   align-items : flex-start;
   position : relative;
   .avatar {
       margin-right : 0.7rem;
   }
   .top-bar-middle {
       display : flex;
       flex :1;
       flex-direction : column;
       &&&.name {
            font-size : 1rem;
            margin: 0px;
            padding : 0px;
       }
   }
   .icon-btn {
       position: absolute;
       right : -5px;
       top : -10px; 
   }
`;
export const Action = styled.div`
   display : flex;
   align-items : center;
   ${({ theme }) => `
        color : ${theme.palette.text.primary};
   `}
`;

export const CommentInput = styled.div`
    display : flex;
    margin : 7px 0px; 
    .textarea {
        display : flex;
        flex : 1;
        background : rgba(255, 255, 255, 0.1);
        border-radius : 1.5rem;
        overflow : hidden;
        margin-left : 0.5rem;
        align-items : center;
     }
`;

export const StyledTextArea = styled(TextareaAutosize)`
     flex : 1;
     resize : none;
     outline : none;
     border : 0;
     font-size : 0.9rem;
     padding : 0.7rem 0.9rem;
     background : #3b3c3c;
     font-family: 'Roboto', "Helvetica", "Arial", "sans-serif";
     ${({ theme }) => `
       color : ${theme.palette.text.primary};
       ::placeholder {
            color : ${theme.palette.text.secondary};
        }
    `}
`;

export const SmallAvatar = styled(Avatar)`
    &&& {
        height: 35px;
        width: 35px;
    }
`;
