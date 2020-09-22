import styled from 'styled-components';

export const Container = styled.div`
    ${({ theme }) => `
        background : ${theme.palette.background.default};
    `}  
`;
export const Routes = styled.div`
   padding : 1rem;
   @media(max-width : 768px) {
       padding : 0.5rem 0rem;
   }
`;