import styled from 'styled-components';
import { Paper } from '@material-ui/core'

export const Container = styled(Paper)`
    &&& {
    width : 260px;
    position : absolute;
    top : 105%;
    left : 0px;
    z-index : 10;
    border : 1px solid rgba(255, 255, 255, 0.2);
        height : 220px !important;
    }
`

export const List = styled.div`
   padding : 1rem;
    cursor : pointer;
    :hover {
        background : rgba(255, 255, 255, 0.1);
    }
`;