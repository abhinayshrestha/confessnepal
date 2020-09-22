import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export const Container = styled.div`
    flex : 1;
    position : relative;
    .fixed-flex {
        display : flex;
        align-items : flex-end;
        flex-direction : column;
        position : sticky;
        top : 5rem;
        @media(max-width : 992px){
            position : relative;
            top : 0rem;
            flex-direction : row;
            overflow-x : auto;
            margin-bottom : 0.5rem;
            padding : 0px 0.3rem;
            ::-webkit-scrollbar 
            {   
               display: none;
            }
        }
    }
`;

export const StyledButton = styled(Button)`
   &&& {
      width : 100%;
      padding-top : 0.6rem;
      padding-bottom : 0.6rem;
      border-radius : 1.2rem;
      text-align : right;
      text-transform : capitalize;
      .MuiButton-label {
          white-space : nowrap;
      }
      :hover {
          background : transparent;
      }
      @media(max-width : 992px){
            width : auto;
      }
   }
`;

export const StyledNavLink = styled(NavLink)`
   &&& {
       text-decoration : none;
       width : 100%;
       &.active-nav ${StyledButton} {
           ${({ theme }) => `
                background : ${theme.palette.background.paper};
           `}
       }
       @media(max-width : 992px){
            width : auto;
        }
   }
`;

export const StyledSkeleton = styled(Skeleton)`
    &&& {
        border-radius : 20px;
        height : 40px;
        width : 70%;
        margin-top : 10px;
        @media(max-width : 992px) {
            width : 30%;
            margin-left : 7px;
            margin-top : 0px;
        }
    }
`;
