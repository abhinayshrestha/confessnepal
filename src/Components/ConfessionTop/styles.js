import styled from 'styled-components';
import { Select, FormControl } from '@material-ui/core';

export const Container = styled.div`
    width : 100%;
`;

export const ConfessInputContainer = styled.div`
    width : 100%;
    border-radius : 7px;
    padding : 1rem 1rem 0.8rem;
    ${({ theme }) => `
       background : ${theme.palette.background.paper};
    `}
    @media(max-width : 768px) {
        border-radius : 0px;
   }
`;
export const TopSection = styled.div`
    display : flex;
    width : 100%;
    transition : all 500ms;
`;

export const StyledTextArea = styled.textarea`
    &&& {
        flex : 1;
        resize : none;
        margin-left : 1rem;
        outline : none;
        border : 0;
        font-size : 1rem;
        height : 70px;
        padding-top : 0.55rem;
        font-family: 'Roboto', "Helvetica", "Arial", "sans-serif";
        white-space: pre-wrap;
        transition : all 500ms;
        ${({ theme }) => `
        background : ${theme.palette.background.paper};
        color : ${theme.palette.text.primary};
        ::placeholder {
                color : ${theme.palette.text.secondary};
            }
        `}
        @media(max-width : 992px){
            margin-left : 0.3rem;
        }
    }
`;
export const Action = styled.div`
    display : flex;
    width : 100%;
    padding-top : 0.5rem;
    justify-content : space-between;
    position : relative;
    ${({ theme }) => `
       color : ${theme.palette.text.primary};
    `}
    .left {
        display : flex;
        align-items : center;
        position : relative;
        .MuiSvgIcon-root {
            cursor: pointer;
        }
    }
`;

export const StyledFormControl = styled(FormControl)`
     &&& {
        .MuiSelect-root {
            font-size: 0.8125rem !important;
            line-height: 1.3;
            font-weight: 500;
            padding-left: 1rem;
        }
        .MuiInput-underline:before {
          display : none !important;
        }
        .MuiInput-underline:after {
          display : none !important;
        }
     }
`;

export const StyledSelect = styled(Select)`
   &&& {
      .MuiSelect-root {
          padding-left : 10px;
          font-size : 0.9rem;
          background : rgba(255, 255, 255, 0.1);
          border-radius : 20px;
        }
    }
`;
