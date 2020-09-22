import styled from 'styled-components';

export const Container = styled.div`
    height : ${window.innerHeight}px;
    width : 100%;
    ${({ theme }) => `
        background : ${theme.palette.background.default};
    `}
`
export const Header = styled.div`
    height : 4rem;
    padding : 1rem;
    display : flex;
    align-items : center;
    ${({ theme }) => `
        background : ${theme.palette.background.default};
    `}
`
export const Body = styled.div`
   
`