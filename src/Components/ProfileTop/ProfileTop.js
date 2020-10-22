import React from 'react'
import { Container, Layout, StyledAvatar, NameSection, StatBox } from './styles'
import { Button, Divider, Typography } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ModeCommentRoundedIcon from '@material-ui/icons/ModeCommentRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

const userImg = 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=346197859751658&height=400&width=400&ext=1602309617&hash=AeRB5GpE8d8rOefs'

function ProfileTop() {
    return (
        <Container>
            <Layout>
                <StyledAvatar src={userImg}>A</StyledAvatar>
                <NameSection>
                    <div className='userDetail'>
                        <Typography variant='h5' color='textPrimary' className='name'>
                                Abhinay Shrestha
                        </Typography>
                        <Typography variant='subtitle2' color='textSecondary' className='detail' gutterBottom>
                                Gender : -- &nbsp;&nbsp;&nbsp; Age : 28 &nbsp;&nbsp;&nbsp; Lives in : Nepal
                        </Typography>
                        <Button variant='outlined' 
                                className='editBtn' 
                                size='small' 
                                startIcon={<SettingsIcon style={{ fontSize : '1rem' }}/>}
                                endIcon={<ErrorRoundedIcon style={{ fontSize : '1rem',color : '#f57c00' }}/>}>
                            Edit Profile
                        </Button>
                    </div>
                    <div style={{ display : 'flex' }}>
                        <StatBox>
                            <FavoriteRoundedIcon style={{ color : '#ed4956', fontSize : '2.2rem' }}/>
                            <Typography variant='subtitle2' color='textSecondary' className='stat-text'>
                              10K Likes
                            </Typography>
                        </StatBox>
                        <StatBox>
                            <ModeCommentRoundedIcon color='primary' style={{ fontSize : '2.2rem' }}/>
                            <Typography variant='subtitle2' color='textSecondary' className='stat-text'>
                              22 Posts
                            </Typography>
                        </StatBox>
                        <StatBox>
                            <BookmarkRoundedIcon style={{ fontSize : '2.2rem', color : '#f37d30' }}/>
                            <Typography variant='subtitle2' color='textSecondary' className='stat-text'>
                              10 Saved
                            </Typography>
                        </StatBox>
                    </div>
                </NameSection>
                <Divider />
            </Layout>
        </Container>
    )
}

export default ProfileTop
