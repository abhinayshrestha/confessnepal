import React, { useState, useEffect } from 'react'
import { Container, ConfessInputContainer, TopSection, Action, StyledTextArea, StyledSelect, StyledFormControl } from './styles'
import { Avatar, Button, ClickAwayListener, CircularProgress } from '@material-ui/core'
import test from '../../Assets/test.jpg'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CustomMenu from '../CustomMenu/CustomMenu'
import { useSelector, useDispatch } from 'react-redux'
import { Skeleton } from '@material-ui/lab'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker } from 'emoji-mart'
import { postConfess } from '../../Store/Actions/confessActions/actionCreators'
import data from 'emoji-mart/data/google.json'

function Confessions() {

    const [openPrivacySetting, setOpenPrivacySetting] = useState(false);
    const [isPrivate, setIsPrivate] = useState(true);
    const { loadingUser, user } = useSelector(state => state.userReducer)
    const categories = useSelector(state => state.categoriesReducer.categories)
    const posting = useSelector(state => state.confessReducer.posting)
    const success = useSelector(state => state.snackBarReducer.success.postConfess)
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('/others');
    const dispatch = useDispatch();

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

    const submitHandler = () => {
        if(text.length > 0){
            const data = {
                content : text,
                isPrivate : isPrivate,
                tags : selectedCategory
            }
            dispatch(postConfess(data));
        }
    }

    useEffect(() => {
        if(success.value) {
            setText('');
        }
    }, [success])

    return (
        <Container>
            <ConfessInputContainer>
                <TopSection>
                        { !loadingUser ?
                            <Avatar src={(user && user.profilePicURL) || test} alt=''/>
                            :
                            <Skeleton variant='circle' height='40px' width='40px'/>
                        }
                        <StyledTextArea placeholder='Write your confession...' 
                                        value={text}
                                        onChange={textHandler}
                                        />
                </TopSection>
                <Action>
                     <div className='left'>
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
                            style={{ color : '#ffe066', marginRight : '7px' }}
                            onClick={() => setShowEmoji(true)}/> 
                        {showEmoji && 
                          <ClickAwayListener onClickAway={() => setShowEmoji(false)}>
                                <NimblePicker data={data} set='facebook' theme='dark' showPreview={false} showSkinTones={false}
                                        style={{ position : 'absolute', top : '105%', zIndex : '2', left : '0px' }}
                                        onSelect={emojiHandler}
                                        />
                          </ClickAwayListener>
                         }
                     </div>
                     <Button color='primary' 
                             variant='contained'
                             disabled={posting}
                             size='small'
                             style={{ textTransform : 'capitalize' }}
                             disableElevation
                             onClick={submitHandler}>
                        {posting ? <CircularProgress size={18}/> : 'Confess' }
                     </Button>
                    { openPrivacySetting && 
                            <CustomMenu close={closePrivacySetting} isPrivate={isPrivate} /> 
                    }
                </Action>
            </ConfessInputContainer>
        </Container>
    )
}

export default Confessions
