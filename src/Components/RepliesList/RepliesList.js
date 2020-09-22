import React from 'react'
import { SmallAvatar ,CommentList } from '../Styles/styles'
import { Chip } from './styles'
import { Typography, Divider } from '@material-ui/core'
import { TimelineDot } from '@material-ui/lab'
import anonymous from '../../Assets/anonymous.jpg'
import { EmojioneV4 } from 'react-emoji-render';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import JavascriptTimeAgo from "javascript-time-ago";
import ReactTimeAgo from 'react-time-ago'
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { useSelector } from 'react-redux'

JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(ru);

function RepliesList({ replies, commentId, openModal, confessUser, editReply }) {

    const { _id } = useSelector(state => state.userReducer.user);

    const replyHandler = reply => {
        const info = {
            _id : commentId,
            user : {...reply.repliedBy},
            isPrivate : reply.isrepliedByPrivate
        }
        openModal(info);
    }

    const editReplyHandler = reply => {
        editReply({ reply : reply.reply, replyId : reply._id }, commentId)
    }

    return (
           replies ? replies.map(reply => 
                        <CommentList key={reply._id}>
                            <SmallAvatar src={reply.repliedBy.profilePicURL || anonymous} alt='' className='avatar'/>
                            <div className='comment'>
                                <Typography style={{ display : 'flex', alignItems : 'center'}} 
                                            className='name' 
                                            color='primary' 
                                            variant='subtitle2'>
                                        {reply.repliedBy.name && reply.repliedBy.name}
                                        <TimelineDot style={{ padding : '0px', marginLeft : '7px' }}/>
                                        <Typography variant='caption' 
                                            color='textSecondary'
                                            style={{ marginLeft : '5px' }}>   
                                                <ReactTimeAgo date={new Date(reply.createdAt)} />
                                        </Typography>
                                </Typography>
                                <Typography className='desc' color='textPrimary' variant='caption' gutterBottom>
                                        <Chip size="small">
                                            @{reply.mentioned.name && reply.mentioned.name}
                                        </Chip> 
                                        <EmojioneV4 size={64} text={reply.reply}/>
                                </Typography> 
                                <div className='view-btn'>
                                    <Typography variant='caption' 
                                                color='textSecondary'
                                                onClick={replyHandler.bind(null, reply)}
                                                style={{ cursor : 'pointer', fontWeight : '500' }}>
                                            <SubdirectoryArrowRightIcon fontSize='inherit' style={{ marginRight : '3px' }}/>          
                                            Reply
                                    </Typography>
                                    { (reply.repliedBy._id === _id) && 
                                                <Divider  orientation="vertical" flexItem style={{ margin : '0px 7px' }}/>}
                                        {(reply.repliedBy._id === _id) && <Typography variant='caption' 
                                                    color='textSecondary'
                                                    onClick={editReplyHandler.bind(null, reply)}
                                                    style={{ cursor : 'pointer', fontWeight : '500' }}>
                                                Edit
                                        </Typography>}
                                        {(confessUser === _id || (reply.repliedBy._id  === _id)) && <Divider  orientation="vertical" flexItem style={{ margin : '0px 7px' }}/>}
                                        {(confessUser === _id || (reply.repliedBy._id  === _id)) && <Typography variant='caption' 
                                                    color='textSecondary'
                                                    style={{ cursor : 'pointer', fontWeight : '500' }}>
                                                Delete
                                        </Typography>}
                                </div>
                            </div>
                        </CommentList>
                     ) 
            :
            null
    )
}

export default RepliesList
