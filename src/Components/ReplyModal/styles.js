import { Dialog } from '@material-ui/core'
import styled from 'styled-components';
import { TextareaAutosize } from '@material-ui/core'

export const StyledDialog = styled(Dialog)`
   &&& {
       .MuiPaper-root {
           width : 70%;
           height : 80%;
       }
       .text-area-root {
           display : flex;
           margin-top : 0px;
       }
       @media(max-width : 992px){
            .MuiPaper-root{
                   width : 100vw;
                   margin:0px;
                   max-height : ${window.innerHeight}px !important;
                   height : ${window.innerHeight}px !important;
               }
        }
   }
`;

export const StyledTextArea = styled(TextareaAutosize)`
     flex : 1;
     resize : none;
     outline : none;
     border : 0;
     font-size : 1rem;
     padding : 0.7rem 0.9rem;
     background : transparent;
     font-family: 'Roboto', "Helvetica", "Arial", "sans-serif";
     ${({ theme }) => `
       color : ${theme.palette.text.primary};
       ::placeholder {
            color : ${theme.palette.text.secondary};
        }
    `}
`;
