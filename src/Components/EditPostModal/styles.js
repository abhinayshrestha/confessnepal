import styled from 'styled-components';
import { DialogContent, Dialog, FormControl, Select } from '@material-ui/core'

export const StyledDialogContent = styled(DialogContent)`
        &&& {
            .options{
                display : flex;
                align-items : flex-start;
                position : relative;
            }
            .text-area-root {
                display : flex;
                margin-top : 1rem;
            }
        }
`;

export const StyledDialog = styled(Dialog)`
   &&& {
       .MuiPaper-root {
           width : 70%;
           height : 80%;
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

export const StyledFormControl = styled(FormControl)`
     &&& {
        .MuiInput-underline:before {
          display : none !important;
        }
        .MuiInput-underline:after {
          display : none !important;
        }
     }
`;

export const StyledSelect = styled(Select)`
   &&& {
      .MuiSelect-root {
          padding-left : 10px;
          font-size : 0.9rem;
          background : rgba(255, 255, 255, 0.1);
          border-radius : 20px;
        }
    }
`;

export const StyledTextArea = styled.textarea`
    &&& {
        flex : 1;
        resize : none;
        margin-left : 1rem;
        outline : none;
        border : 0;
        font-size : 1rem;
        height : 200px;
        padding-top : 0.55rem;
        font-family: 'Roboto', "Helvetica", "Arial", "sans-serif";
        white-space: pre-wrap;
        transition : all 500ms;
        ${({ theme }) => `
        background : ${theme.palette.background.paper};
        color : ${theme.palette.text.primary};
        ::placeholder {
                color : ${theme.palette.text.secondary};
            }
        `}
        @media(max-width : 992px){
            margin-left : 0.3rem;
        }
    }
`;