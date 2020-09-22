import React, { useState, useEffect, useRef } from 'react'
import { DialogTitle, DialogActions, Button, ClickAwayListener, Avatar, CircularProgress } from '@material-ui/core'
import { StyledDialogContent, StyledDialog, StyledFormControl, StyledSelect, StyledTextArea } from './styles';
import CustomMenu from '../CustomMenu/CustomMenu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/google.json'
import test from '../../Assets/test.jpg'
import { updateConfess } from '../../Store/Actions/confessActions/actionCreators'

function EditPostModal({ open, handleClose, confess }) {

    const [isPrivate, setIsPrivate] = useState(confess.isPrivate);
    const [openPrivacySetting, setOpenPrivacySetting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(confess.tags);
    const categories = useSelector(state => state.categoriesReducer.categories)
    const [text, setText] = useState(confess.content);
    const [showEmoji, setShowEmoji] = useState(false);
    const { user } = useSelector(state => state.userReducer)
    const { success } = useSelector(state => state.snackBarReducer)
    const { updatingConfess } = useSelector(state => state.confessReducer)
    const dispatch = useDispatch();
    const inputRef = useRef();

    const closePrivacySetting = value => {
        setIsPrivate(value);
        setOpenPrivacySetting(false)
    }

    const emojiHandler = value => {
        setText(text+value.native)
    }

    const textHandler = (e) => {
        setText(e.target.value);
    }


    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    }

    const updateConfessHandler = () => {
        if(text.length > 0) {
            let payload = {
                postId : confess._id,
                isPrivate : isPrivate,
                tags : selectedCategory,
                content : text
            }
            dispatch(updateConfess(payload));
        }
    }

    useEffect(() => {
        if(success.updateConfess.value) {
            handleClose();
        }
    }, [success.updateConfess, handleClose])

    return (
        <StyledDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Edit confession</DialogTitle>
            <StyledDialogContent dividers>
                <div className='options'>
                    <Button color='inherit'
                            size='small'
                            endIcon={<ArrowDropDownIcon fontSize='small' color='inherit'/>}
                            style={{ textTransform : 'capitalize', 
                                    background : 'rgba(255, 255, 255 , 0.1)', 
                                    paddingLeft : '20px',
                                    paddingRight : '20px',
                                    marginRight : '7px',
                                    borderRadius : '20px' }}
                            onClick={() => setOpenPrivacySetting(true)}>
                        {isPrivate ? 'Anonymous ': 'Public'}     
                    </Button>
                    { openPrivacySetting && 
                        <CustomMenu close={closePrivacySetting} isPrivate={isPrivate} /> 
                    }
                    <StyledFormControl style={{ marginRight : '7px', textAlign : 'center' }}>
                        <StyledSelect
                            native
                            autoWidth
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                        {
                            categories && categories.map(category => 
                                <option key={category.link} value={category.link}>{category.label}</option>
                            )
                        }
                        </StyledSelect>
                    </StyledFormControl>
                    <EmojiEmotionsIcon 
                            style={{ color : '#ffe066', marginRight : '7px', alignSelf : 'center', cursor : 'pointer' }}
                            onClick={() => setShowEmoji(true)}/> 
                        {showEmoji && 
                          <ClickAwayListener onClickAway={() => setShowEmoji(false)}>
                                <NimblePicker data={data} set='facebook' theme='dark' showPreview={false} showSkinTones={false}
                                        style={{ position : 'absolute', top : '105%', zIndex : '2', right : '0px' }}
                                        onSelect={emojiHandler}
                                        />
                          </ClickAwayListener>
                         }
                </div>
                <div className='text-area-root'>
                    <Avatar src={(user && user.profilePicURL) || test} style={{ marginLeft : '7px' }} alt=''/>
                    <StyledTextArea placeholder='Edit your confession...' 
                            value={text}
                            ref={inputRef}
                            onChange={textHandler}
                            autoFocus
                            />
                </div>
            </StyledDialogContent>
            <DialogActions>
                {updatingConfess.value && <CircularProgress size={22}/>}
                <Button size='small' onClick={updateConfessHandler} disabled={updatingConfess.value}>
                    Save
                </Button>
                <Button onClick={handleClose} size='small' disabled={updatingConfess.value}>
                    Cancel
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default EditPostModal
