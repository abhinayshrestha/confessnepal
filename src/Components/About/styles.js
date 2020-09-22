import styled from 'styled-components';
import { Typography } from '@material-ui/core'

export const Container = styled.div`
    box-sizing : border-box;
    padding : 1rem;
    display : flex;
    flex-direction : column;
    width : 100%;
    @media(min-width : 768px) {
        position : relative;
        top : 30%;
    }
    .fixed-flex {
        top : 0px;
    }
`
export const HeadLine = styled(Typography)`
    &&& {
        font-size : 3rem;
        font-family: 'Do Hyeon', sans-serif;
        line-height : 3rem;
    }
` 
export const Detail = styled(Typography)`
    &&& {
        font-size : 1rem;
        padding : 0rem 1rem;
        font-weight : 400;
    }
` 
export const Action = styled.div`
    display : flex;
    justify-content : center;
    margin-top : 1rem;
    ${({ theme }) => `
        background : ${theme.palette.background.default};
    `}
    @media(max-width : 768px) {
        flex-direction : column;
        .google-btn {
            margin-top : 10px;
            margin-left : 0px !important;
        }
    }
`;

export const SocialButton = styled.button`
   outline : 0;
   border : 0;
   display : flex;
   align-items : center;
   ${({ theme, backgroundcolor }) => `
       background : ${backgroundcolor};
   `}
   color : #fff;
   padding : 0.3rem 0.6rem;
   cursor : pointer;
   border-radius : 3px;
   position : relative;
   .loader {
      position : absolute;
      height : 100%;
      width : 100%;
      background : rgba(0, 0, 0, 0.8);  
      left :0;
      top :0;
      display : flex;
      justify-content : center;
      align-items : center;
   } 
   @media(max-width : 992px) {
        justify-content : center;
   }
   @media(max-width : 768px) {
        padding : 0.6rem 0.6rem;
   }
`