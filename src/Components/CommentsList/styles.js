import styled from 'styled-components';
import { Avatar } from '@material-ui/core'

export const SmallAvatar = styled(Avatar)`
    &&& {
        height: 35px;
        width: 35px;
    }
`;
export const CommentList = styled.div`
   display : flex;
   align-items : flex-start;
   margin-top : 7px;
   .comment {
        font-size : 0.95rem;
        margin-left : 0.7rem;
        display : flex;
        flex-direction : column;
        .desc {
            font-size : 0.95rem;
            line-height : 1rem;
            white-space: break-spaces;
            word-break: break-word;
            img{
            height : 1rem !important;
            width : 1rem !important;
        }
        }
        .view-btn {
            display : flex;
            margin : 1px 0px 3px;
        }
   }
`;
export const CommentListContainer = styled.div`
    
`;
