import styled from 'styled-components';
import { Dialog } from '@material-ui/core'

export const StyledDialog = styled(Dialog)`
   &&& {
     .MuiBackdrop-root {
         background : rgba(0, 0, 0, 0.7);
     } 
     .MuiDialog-paper {
         margin : 0px;
         width : 500px;
     }
     .MuiDialogActions-root {
         padding-bottom : 0.8rem;
         padding-right : 0.8rem;
     }
     @media(max-width : 768px) {
         margin : 0px 10px;
     }
   }
`;