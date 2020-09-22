import styled from 'styled-components';
import { Paper } from '@material-ui/core'
export const Container = styled(Paper)`
       &&& {
        padding : 1rem;
        margin-top : 10px;
        width : 100%;
        border-radius : 7px;
        @media(max-width : 768px) {
           border-radius : 0px;
        }
     }
     .top {
         display : flex;
         align-items : center;
     }
     .center {
         height : 120px;
     }
     .bottom {
         display : flex;
         width : 100%;
         justify-content :center;
     }
`;