import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

export const Container = styled.div`
    height : 4rem;
    .appbar-container{
        height: 100%;
        flex : 1;
        display : flex;
        justify-content : center;
    }
    .logo-container {
        @media( max-width : 992px ){
            flex : 1;
        }
        @media( max-width : 768px ){
            display : none;
        }
    }
`;

export const Header = styled.div`
    position : fixed;
    height : 4rem;
    padding : 0.8rem 1rem;
    width : 100%;
    display : flex;
    align-items : center;
    z-index : 700;
    ${({ theme }) => `
        background : ${theme.palette.background.default};
    `}
    border-bottom : 1px solid rgba(255, 255, 255 , 0.1);
    @media( max-width : 768px ){
        justify-content : center;
    }
`;

export const SearchBox = styled.div`
   display : flex;
   width : 400px;
   height : 100%;
   align-items : center;
   padding : 0rem 1rem;
   color : #fff;
   border-radius : 30px;
   ${({ theme }) => `
        background : ${theme.palette.background.paper};
    `}
   input {
        height : 100%;
        outline : none;
        margin-left : 10px;
        flex : 1;
        border : 0;
        color : #fff;
        ${({ theme }) => `
        background : ${theme.palette.background.paper};
        `}
        font-size : 0.99rem;
        ::placeholder {
            ${({ theme }) => `
                color : ${theme.palette.text.secondary};
                `}
        }
   } 
`;

export const StyledAvatar = styled(Avatar)`
   &&& {
       margin-left : 0.7rem;
       ${({ theme }) => `
            background : ${theme.palette.background.paper};
            color : ${theme.palette.text.secondary};
       `}
   }
`;

export const StyledNavLink = styled(NavLink)`
   &&& {
       text-decoration : none;
       :hover ${StyledAvatar} {
           background : rgba(255,255,255,0.3);
       }
      &.activeNav ${StyledAvatar} {
          ${({ theme }) => `
               background : ${theme.palette.primary.main}; 
               color : #fff;
          `}
      }
   }
`;

export const ProfileLink = styled(NavLink)`
   &&& {
       text-decoration : none;
       display : flex;
       align-items : center;
       justify-content :flex-start;
       position : relative;
       padding : 0.2rem 0.7rem 0.2rem 0.4rem;
       ${({ theme }) => `
            background : ${theme.palette.background.paper};
            color : ${theme.palette.text.primary};
       `}
       border-radius : 3rem;
       margin-left : 0.7rem;
       ${StyledAvatar} {
           height : 30px;
           width : 30px;
           margin : 0px;
           margin-right : 0.3rem;
       }
       &.activeNav {
          ${({ theme }) => `
               background : ${theme.palette.primary.main}; 
               color : #fff; 
          `}
      }
      .red-dot {
            height : 9px;
            width : 9px;
            border-radius : 9px;
            margin-left : 7px;
            position :absolute;
            right : 5px;
            top : 0px;
            ${({ theme }) => `
                background : ${theme.palette.secondary.main};
            `}
      }
   }
`;