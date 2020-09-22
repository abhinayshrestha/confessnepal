import React, { useState } from 'react'
import { SmallAvatar ,CommentList , CommentListContainer } from '../Styles/styles'
import { Typography, Divider, CircularProgress } from '@material-ui/core'
import { TimelineDot } from '@material-ui/lab'
import JavascriptTimeAgo from "javascript-time-ago";
import ReactTimeAgo from 'react-time-ago'
import anonymous from '../../Assets/anonymous.jpg'
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { EmojioneV4 } from 'react-emoji-render';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import RepliesList from '../RepliesList/RepliesList';
import { useDispatch, useSelector } from 'react-redux'
import { loadReplies } from '../../Store/Actions/confessActions/actionCreators'
import ReplyModal from '../ReplyModal/ReplyModal';

JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(ru);

function CommentsList({ comments, postId, isConfessPrivate, confessUser }) {

    const dispatch = useDispatch();
    const { replies, loadingReplies } = useSelector(state => state.confessReducer);
    const [openReplyModal, setOpenReplyModal] = useState(null);
    const { _id } = useSelector(state => state.userReducer.user);

    const loadRepliesHandler = (commentId, index) => {
        (((replies[commentId] && replies[commentId].length) || -1) < comments[index].repliesCount) 
                && dispatch(loadReplies(commentId, postId, index))
    }

    const openModal = info => {
        setOpenReplyModal(<ReplyModal open = {true} 
                                handleClose={closeModal} 
                                postId={postId} 
                                isConfessPrivate={isConfessPrivate}
                                info={info}
                                action='reply'
                                confessUser = {confessUser}
                             />);
    }

    const editCommentHandler = info => {
        setOpenReplyModal(<ReplyModal open = {true} 
            handleClose={closeModal} 
            postId={postId} 
            info={info}
            action='editComment'
         />);
    }

    const editReplyHandler = (info, commentId) => {
        setOpenReplyModal(<ReplyModal open = {true} 
            handleClose={closeModal} 
            info={info}
            postId={commentId}
            action='editReply'
         />);
    }

    const closeModal = () => {
        setOpenReplyModal(null);
    }

    return (
          <CommentListContainer>
                {openReplyModal}
                {
                    comments && comments.map((commentList, index) => 
                        <CommentList key={commentList.comments._id}>
                            <SmallAvatar src={commentList.comments.user.profilePicURL || anonymous} alt='' className='avatar'/>
                            <div className='comment'>
                                    <Typography style={{ display : 'flex', alignItems : 'center'}} 
                                                className='name' 
                                                color='primary' 
                                                variant='subtitle2'>
                                            {commentList.comments.user.name}
                                            <TimelineDot style={{ padding : '0px', marginLeft : '7px' }}/>
                                            <Typography variant='caption' 
                                                color='textSecondary'
                                                style={{ marginLeft : '5px' }}>
                                                    <ReactTimeAgo date={new Date(commentList.comments.createdAt)} />
                                            </Typography>
                                    </Typography>
                                    <Typography className='desc' color='textPrimary' variant='caption' gutterBottom>
                                        <EmojioneV4 size={64} text={commentList.comments.comment}/>
                                    </Typography>
                                    <div className='view-btn'>
                                        <Typography variant='caption' 
                                                    color='textSecondary'
                                                    style={{ cursor : 'pointer', fontWeight : '500' }}
                                                    onClick={openModal.bind(null, commentList.comments)}>
                                              <SubdirectoryArrowRightIcon fontSize='inherit' style={{ marginRight : '3px' }}/>          
                                                Reply
                                        </Typography>
                                        <Divider  orientation="vertical" flexItem style={{ margin : '0px 7px' }}/>
                                        <Typography variant='caption' 
                                                    color='textSecondary'
                                                    onClick={loadRepliesHandler.bind(null, commentList.comments._id, index)}
                                                    style={{ cursor : 'pointer', fontWeight : '500' }}>
                                                View {commentList.repliesCount} replies
                                        </Typography>
                                       { (commentList.comments.user._id === _id) && 
                                                <Divider  orientation="vertical" flexItem style={{ margin : '0px 7px' }}/>}
                                        {(commentList.comments.user._id === _id) && <Typography variant='caption' 
                                                    color='textSecondary'
                                                    style={{ cursor : 'pointer', fontWeight : '500' }}
                                                    onClick={editCommentHandler.bind(null, commentList.comments)}>
                                                Edit
                                        </Typography>}
                                        {(confessUser === _id || (commentList.comments.user._id === _id)) && <Divider  orientation="vertical" flexItem style={{ margin : '0px 7px' }}/>}
                                        {(confessUser === _id || (commentList.comments.user._id === _id)) && <Typography variant='caption' 
                                                    color='textSecondary'
                                                    style={{ cursor : 'pointer', fontWeight : '500' }}>
                                                Delete
                                        </Typography>}
                                    </div >
                                    <div>
                                       {(loadingReplies.value && (loadingReplies.id === commentList.comments._id)) && 
                                            <CircularProgress size={25} style={{ margin : '5px 20px' }}/>}
                                    </div> 
                                    {
                                        commentList.showReplies && 
                                            <RepliesList openModal={openModal} 
                                                        confessUser={confessUser} 
                                                        commentId={commentList.comments._id} 
                                                        editReply = {editReplyHandler}
                                                        replies={replies[commentList.comments._id] && replies[commentList.comments._id]}/>
                                    }
                                </div><br/>
                    </CommentList>
                        )
                }
            </CommentListContainer> 
    )
}

export default CommentsList