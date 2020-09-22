import React, { useState, useEffect } from 'react'
import { StyledDialogContent } from '../EditPostModal/styles'
import { StyledDialog, StyledTextArea } from './styles'
import { DialogTitle, DialogActions, Button, Avatar, ClickAwayListener, CircularProgress } from '@material-ui/core'
import test from '../../Assets/test.jpg'
import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/google.json'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { useSelector, useDispatch } from 'react-redux'
import { postReply, updateComment, updateReply } from '../../Store/Actions/confessActions/actionCreators'

function ReplyModal({ handleClose, open, info, isConfessPrivate, postId, confessUser, action }) {

    const [text, setText]  = useState(action === 'reply' ? '' : info.reply || info.comment);
    const [showEmoji, setShowEmoji] = useState(false);
    const { profilePicURL, _id } = useSelector(state => state.userReducer.user)
    const { success } = useSelector(state => state.snackBarReducer)
    const { postingReplies } = useSelector(state => state.confessReducer)
    const { updatingComment } = useSelector(state => state.confessReducer)
    const { updatingReply } = useSelector(state => state.confessReducer)
    const dispatch = useDispatch()

    const textChangeHandler = e => {
        setText(e.target.value);
    }

    const emojiHandler = value => {
        setText(text+value.native)
    }

    const actionHandler = () => {
        switch(action){
            case 'reply' : 
                if(text.length > 0) {
                    const payload = {
                        postId : postId,
                        commentId : info._id,
                        mentioned : info.user._id,
                        reply : text,
                        isMentionedPrivate : info.isPrivate,
                        isrepliedByPrivate : (isConfessPrivate && (confessUser === _id) ? true : false)
                    }
                    dispatch(postReply(payload, info));
                 }
                 break;
            case 'editComment' : 
                 if(text.length > 0) {
                    const editCommentPayload = {
                        postId : postId,
                        commentId : info._id,
                        comment : text
                    } 
                    dispatch(updateComment(editCommentPayload));
                 }
                 break;
            case 'editReply' : 
                 if(text.length > 0) {
                    const replyPayLoad = {
                        replyId : info.replyId,
                        reply : text
                    }
                    dispatch(updateReply(replyPayLoad, postId))
                 }
                 break;
            default : return;
        }
 
    }

    useEffect(() => {
        if(success.postReply.value){
            handleClose();
        }
        if(success.updateComment.value){
            handleClose();
        }
        if(success.updateReply.value){
            handleClose();
        }
    }, [success.postReply, handleClose, success.updateComment, success.updateReply])

    return (
        <StyledDialog open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title">
                {action === 'reply' && <DialogTitle id="responsive-dialog-title">Reply to @{info.user.name}</DialogTitle>}
                {action === 'editComment' && <DialogTitle id="responsive-dialog-title">Edit comment</DialogTitle>}
                {action === 'editReply' && <DialogTitle id="responsive-dialog-title">Reply comment</DialogTitle>}
                <StyledDialogContent dividers>
                    <div className='text-area-root'>
                        <Avatar src={ profilePicURL || test } style={{ marginLeft : '7px' }} alt=''/>
                        {action === 'reply' && 
                            <StyledTextArea placeholder='Replies....' 
                                value={text}
                                autoFocus
                                onChange={textChangeHandler}
                                />}
                        {action === 'editComment' && 
                            <StyledTextArea placeholder='Edit your comment....' 
                                value={text}
                                autoFocus
                                onChange={textChangeHandler}
                                />}
                        {action === 'editReply' && 
                        <StyledTextArea placeholder='Edit your reply....' 
                            value={text}
                            autoFocus
                            onChange={textChangeHandler}
                            />}
                    </div>
                </StyledDialogContent>
                <DialogActions>
                    <EmojiEmotionsIcon 
                            style={{ color : '#ffe066', marginRight : '2px', cursor : 'pointer' }}
                            onClick={() => setShowEmoji(true)}/> 
                    {showEmoji && 
                        <ClickAwayListener onClickAway={() => setShowEmoji(false)}>
                                <NimblePicker data={data} set='facebook' theme='dark' showPreview={false} showSkinTones={false}
                                        style={{ position : 'absolute', bottom : '0px', zIndex : '2', right : '0px' }}
                                        onSelect={emojiHandler}
                                        />
                        </ClickAwayListener>
                    }
                    {postingReplies && <CircularProgress size={20}/>}
                    {updatingComment && <CircularProgress size={20}/>}
                    {updatingReply && <CircularProgress size={20}/>}
                    <Button onClick={actionHandler} size='small' disabled={postingReplies || updatingComment || updatingReply}>
                        Reply
                    </Button>
                    <Button onClick={handleClose} size='small' disabled={postingReplies || updatingComment || updatingReply}>
                        Cancel
                    </Button>
                </DialogActions>
        </StyledDialog>
    )
}

export default ReplyModal
