import React, { useEffect, useState } from 'react'
import { Container, TopBar, Action, CommentInput, StyledTextArea, SmallAvatar } from './styles'
import { Avatar, Typography, IconButton, Button, CircularProgress, ClickAwayListener, Hidden, Menu, MenuItem } from '@material-ui/core'
import anonymous from '../../Assets/anonymous.jpg'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector , useDispatch } from 'react-redux'
import CardSkeleton from '../CardSkeleton/CardSkeleton'
import { loadConfess } from '../../Store/Actions/confessActions/actionCreators'
import { EmojioneV4 } from 'react-emoji-render';
import { loadComments } from '../../Store/Actions/confessActions/actionCreators'
import CommentsList from '../CommentsList/CommentsList'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import data from 'emoji-mart/data/google.json'
import { NimblePicker } from 'emoji-mart'
import test from '../../Assets/test.jpg'
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { postComment, likePost, unlikePost } from '../../Store/Actions/confessActions/actionCreators'
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import EditPostModal from '../EditPostModal/EditPostModal'
import AlertBox from '../AlertBox/AlertBox'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';

function ConfessCard() {

    const state = useSelector(state => state.confessReducer);
    const dispatch = useDispatch();
    const params = useParams();

    const loadCommentsHandler = (postId, index, commentsCount) => {
         if(commentsCount > 0){
            const skipDocument = (state.comments[postId] && state.comments[postId].length )|| 0;
            (((state.comments[postId] && state.comments[postId].length) || -1) < state.confess[index].commentsCount) 
               && dispatch(loadComments(postId, index, skipDocument));
         }
    }
 
    const scrollHandler = () => {
        dispatch(loadConfess(params.tag, state.confess.length))
    }

    useEffect(() => {
        dispatch(loadConfess(params.tag, 0))
    }, [dispatch, params])

    return (
        <InfiniteScroll
            dataLength = {state.confess.length}
            next={scrollHandler}
            hasMore={state.hasMoreConfess}
            loader={
                <>
                    <CardSkeleton />
                    <CardSkeleton />
                </> 
            }
        >
           {
               state.confess.map((confess, index) => <Card key={confess._id} 
                            load={loadCommentsHandler} 
                            confess={confess}
                            index={index}
                            comments={state.comments}/>  )
           } 
           {
               state.confessLoader &&
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                    </> 
           }
        </InfiniteScroll>
    )
}

export default ConfessCard;

const Card = ({ confess, load, comments, index }) => {

    const [commentText, setCommentText] = React.useState({});
    const [showEmojiPicker, setShowEmojiPicker] = useState({ x : 0, y : 0, value : false })
    const profilePic = useSelector(state => state.userReducer.user && state.userReducer.user.profilePicURL)
    const userId = useSelector(state => state.userReducer.user && state.userReducer.user._id)
    const success = useSelector(state => state.snackBarReducer.success.postComment)
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEditModal, setOpenEditModal] = React.useState(false)
    const [alertBox, setAlertBox] = useState(null);

    const closeAlertBox = () => {
        setAlertBox(null);
    }

    const deleteHandler = confessId => {
         handleClose();
         setAlertBox(<AlertBox id={confessId} action='deleteConfess' closeHandler={closeAlertBox}/>)
    }

    const showemojiHandler = el => {
        const rect = el.target.getBoundingClientRect();
        setShowEmojiPicker({ x : rect.left + window.scrollX, y : rect.top + window.scrollY, value : true})
    }

    const emojiHandler = (id, value) => {
        setCommentText({
            ...commentText,
            [id] : commentText[id] ? commentText[id]+value.native : value.native
        })
    }

    const commentTextHandler = (id, e) => {
        setCommentText({
            ...commentText,
            [id] : e.target.value
        })
    }

    const commentHandler = postId => {
        dispatch(postComment(postId, commentText[postId]))
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const closeEditModal = () => {
          setOpenEditModal(false)
      }

      const openEditModalHandler = () => {
          handleClose();
          setOpenEditModal(true)
      }

      const likeHandler = id => {
          dispatch(likePost(id))
      }

      const unlikeHandler = id => {
         dispatch(unlikePost(id))
      }

     React.useEffect(() => {
        if(success.value){
            setCommentText({});
        }
     },[success])
 
    return <Container elevation={0}>
                    {alertBox}
                    <EditPostModal confess={confess} open={openEditModal} handleClose={closeEditModal}/>
                    {showEmojiPicker.value &&
                            <ClickAwayListener onClickAway={() => setShowEmojiPicker({ x : 0, y : 0, value : false})}>
                                    <NimblePicker data={data} set='facebook' theme='dark' showPreview={false} showSkinTones={false}
                                        style={{ position : 'absolute', top : showEmojiPicker.y, zIndex : '2', left : showEmojiPicker.x - 100}}
                                        onSelect={emojiHandler.bind(null, confess._id)}
                                        />
                            </ClickAwayListener>  
                      
                        }
                    <TopBar>
                        <Avatar src={confess.isPrivate ? anonymous : confess.user.profilePicURL} 
                                alt='' 
                                className='avatar'/>
                        <div className='top-bar-middle'>
                            <Typography variant='subtitle2' color='textPrimary' className='name'>
                                {confess.isPrivate ? 'Anonymous' : confess.user.name }
                               {((confess.user._id === userId) && confess.isPrivate) && <Typography variant='caption' color='textSecondary'>
                                    &nbsp;(You)
                                </Typography> }
                            </Typography>
                            <Typography variant='caption'>
                                {new Date(confess.createdAt).toLocaleString()}
                            </Typography>
                        </div>
                        <IconButton className='icon-btn' onClick={handleClick}>
                            <MoreHorizIcon/>
                        </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                              {(userId === confess.user._id) && <MenuItem dense onClick={openEditModalHandler}> 
                                        <EditIcon fontSize='small' style={{marginRight : '10px'}}/> Edit Confess
                                </MenuItem>}
                               {(userId === confess.user._id) &&  <MenuItem dense onClick={deleteHandler.bind(null, confess._id)}>
                                        <DeleteOutlineIcon
                                                fontSize='small' 
                                                style={{marginRight : '10px'}}/> Delete Confess
                                </MenuItem>}
                               <MenuItem dense onClick={handleClose}>
                                        <BookmarkBorderIcon fontSize='small' style={{marginRight : '10px'}}/> Save Confess
                                </MenuItem>
                            </Menu>
                    </TopBar>
                    <div className='confess-text'>
                       <EmojioneV4 size={64} text={confess.content}/>
                    </div>
                    <Action>
                        {
                            confess.liked ? 
                            <IconButton onClick={unlikeHandler.bind(null, confess._id)} edge='end'>
                                <FavoriteIcon style={{ color : '#ed4956' }}/>
                            </IconButton>
                            :
                            <IconButton onClick={likeHandler.bind(null, confess._id)} edge='end'>
                                <FavoriteBorderIcon/>
                            </IconButton>
                        }
                        <Typography variant='subtitle2' color='textSecondary' style={{ marginLeft : '0.5rem', fontSize : '0.8rem' }}>
                            {confess.likesCount}
                        </Typography>
                        <IconButton edge='end'>
                            <ChatBubbleOutlineIcon color='inherit'/>
                        </IconButton>
                        <Typography variant='subtitle2' color='textSecondary' style={{ marginLeft : '0.5rem', fontSize : '0.8rem' }}>
                            {confess.commentsCount}
                        </Typography>
                        <IconButton edge='end'>
                            <ShareIcon color='inherit'/>
                        </IconButton>
                        <Typography variant='subtitle2' color='textSecondary' style={{ marginLeft : '0.5rem', fontSize : '0.8rem' }}>
                            {confess.shares}
                        </Typography>
                    </Action>
                   {
                       confess.showComments && 
                       <CommentsList comments={comments[confess._id] && comments[confess._id]} 
                                     postId={confess._id} 
                                     isConfessPrivate={confess.isPrivate} 
                                     confessUser={confess.user._id}/>
                   }
                     <CommentInput>
                        <SmallAvatar src={profilePic || test} alt='' className='avatar'/>
                        <div className='textarea'>
                            <StyledTextArea placeholder='Your comment...' 
                                        onChange={commentTextHandler.bind(null, confess._id)}
                                        value={commentText[confess._id] || ''}/>
                            <Hidden smDown>
                                <EmojiEmotionsIcon onClick={showemojiHandler} fontSize='small'
                                    style={{ margin : '10px', alignSelf : 'flex-end',cursor : 'pointer' }}/>
                            </Hidden>
                            {/* <CircularProgress size={20} style={{ margin : '10px 10px 10px 0px', alignSelf : 'flex-end',cursor : 'pointer' }}/> */}
                            <SendIcon fontSize='small' 
                                      onClick={commentHandler.bind(null, confess._id)}
                                      style={{ margin : '10px 10px 10px 0px', alignSelf : 'flex-end',cursor : 'pointer' }}/>
                        </div>
                    </CommentInput>
                    <div className='action'>
                        <Button startIcon={(((comments[confess._id] && comments[confess._id].length) || -1) < confess.commentsCount) && <ArrowDropDownIcon />} 
                                color='primary' size='small'
                                onClick={load.bind(null, confess._id, index, confess.commentsCount)}>
                            View {confess.commentsCount - ((comments[confess._id] && comments[confess._id].length) || 0)} comments
                        </Button> 
                       {confess.loading && <CircularProgress size={20} style={{ marginLeft : '0.4rem' }}/>}
                    </div>
            </Container>
}
