import styled from 'styled-components';
import { Avatar } from '@material-ui/core'

export const Container = styled.div`
     max-width : 700px;
     position : relative;
     transform : translateX(-50%);
     left : 50%;
     margin-top : 1rem;
`;

export const Layout = styled.div`
    height : 100px;
    display : flex;
`;

export const StyledAvatar = styled(Avatar)`
   &&& {
       height : 100px;
       width : 100px;
       ${({ theme }) =>   `
            background : ${theme.palette.background.paper};
       `}   
   }
`;

export const NameSection = styled.div`
    display : flex;
    flex-direction : column;
    margin-left : 2rem;
    justify-content : flex-start;
    &&&{
        .name {
            font-weight : 500;
            margin-top : 0.4rem;
        }
        .editBtn {
            text-transform : capitalize;
            letter-spacing : normal;
            width : 140px;
            margin-top : 0.2rem;
            ${({ theme }) => `
                color : ${theme.palette.text.primary};
            `}
        }
        .userDetail {
            display : flex;
            flex-direction : column;
            justify-content : space-around;
        }
        .detail {
            font-size : 0.8rem;
            font-weight : 400;
        }
    }
`;

export const StatBox = styled.div`
     background : rgba(0, 0, 0 , 0.2);
     width : 7rem;
     border-radius : 10px;
     margin: 0.8rem 0.8rem 0rem 0rem;
     display : flex;
     flex-direction : column;
     align-items : center;
     padding : 0.6rem;
     .stat-text {
         margin-top : 0px;
         font-size : 0.7rem;
     }
`;