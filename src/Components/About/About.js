import React, { useState } from 'react'
import { Container, HeadLine, Detail, SocialButton,Action } from './styles'
import { Typography, Fade, IconButton, CircularProgress } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../../Store/Actions/authActions/actionCreators'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

function About() {

    const dispatch = useDispatch();
    const authLoader = useSelector(state => state.authReducer.authLoader)
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const responseFacebook = response => {
       if(response.picture && response.picture.data) {
            const user = {
                userId : response.userID,
                name : response.name,
                profilePicURL : response.picture.data.url,
                accessToken : response.accessToken
            }
            console.log(user);
           dispatch(authenticate(user));
       } 
       else {
           setOpenSnackbar(true);
           setTimeout(() => {
              setOpenSnackbar(false);
           }, 3000)
       }
    }

    return (
        <Container>
            <HeadLine variant='subtitle2' color='textPrimary' align='center' gutterBottom>
                A platform to confess about anything.
            </HeadLine>
            <Detail variant='subtitle2' color='textSecondary' align='left' gutterBottom>
                ConfessNepal is a platform where you can confess anything related to a dream, first experience, crush, guilt, 
                a lie and many more keeping your identity hidden. Scroll and read, like and comment on other's confession. 
                Start reading and writing a confession by continuing with your google or facebook account. 
            </Detail>
            <Action>
            <FacebookLogin
                appId="2769860263260609"
                callback={responseFacebook}
                fields="name,email,picture.width(400).height(400)"
                render={renderProps => (
                    <SocialButton disabled = {authLoader}
                                onClick={renderProps.onClick} 
                                backgroundcolor='#4267b2' 
                                className='fb-btn'>
                            <FacebookIcon color='inherit' style={{ marginRight : '7px' }}/>
                            <Typography variant='subtitle2' color='inherit'>
                                Continue with facebook
                            </Typography>
                            {authLoader && <div className='loader'>
                                <CircularProgress size={20} className='circular' color='primary'/>
                            </div>}
                    </SocialButton>
                )}
            />
            
                <SocialButton style={{ marginLeft : '7px'}} backgroundcolor='#fff' className='google-btn'>
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png"
                            style={{ maxWidth : '20px', marginRight : '7px' }} 
                            alt=''/>
                    <Typography variant='subtitle2' style={{ color : '#000' }}>
                        Continue with google
                    </Typography>
                </SocialButton>
            </Action>
            <Fade in={openSnackbar}>
                <Alert
                    style={{
                        position : "fixed",
                        bottom : "1rem",
                        left : '0.5rem',

                    }}
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenSnackbar(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Couldn't sign in right now. Please try again later.
                </Alert>
            </Fade>
        </Container>
    )
}

export default About
