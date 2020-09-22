import styled from 'styled-components';

export const Container = styled.div`
   height : 100px;
   border-radius : 7px;
   flex : 1;
   position : sticky;
   top : 5rem;
   ${({ theme }) => `
        background : ${theme.palette.background.paper};
    `}
  @media(max-width : 992px){
        display : none;
    }
`;