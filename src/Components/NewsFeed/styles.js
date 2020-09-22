import styled from 'styled-components';

export const Container = styled.div`
   height : 100px;
   display : flex;
   height : 100%;
   @media(max-width : 992px){
        flex-direction : column;
    }
`;

export const Confessions = styled.div`
      flex : 2;
      margin : 0px 2rem;
      @media(max-width : 992px){
         margin : 0px;
      }
`;