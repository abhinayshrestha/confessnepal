import React, { useEffect } from 'react'
import { Header, SearchBox, StyledNavLink, StyledAvatar, Container, ProfileLink } from './styles'
import { Hidden, Typography } from '@material-ui/core'
import logo from '../../Assets/logo.png'
import SearchIcon from '@material-ui/icons/Search';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import test from '../../Assets/test.jpg'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton'
import { loadUser } from '../../Store/Actions/userActions/actionCreators'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

function MainAppbar() {

     const { loadingData, user } = useSelector(state => state.userReducer)
     const dispatch = useDispatch();

     useEffect(() => {
         user === null && dispatch(loadUser());
      }, [dispatch, user])

    return (
          <Container>
               <Header>
                    <div className='logo-container'>
                         <img src={logo} alt='' style={{ maxWidth : '130px' }}/>
                    </div>
                    <Hidden smDown>
                         <div className='appbar-container'>
                              <SearchBox>
                                   <SearchIcon color='inherit'/>
                                   <input placeholder='Search...'/>
                              </SearchBox>
                         </div>
                    </Hidden>
                    <Hidden mdUp>
                         <StyledAvatar>
                              <SearchIcon color='inherit'/>
                         </StyledAvatar>
                    </Hidden>
                    <StyledNavLink to='/dashboard' activeClassName='activeNav'>
                         <StyledAvatar>
                              <HomeRoundedIcon color='inherit'/>
                         </StyledAvatar>
                    </StyledNavLink>
                    {!loadingData ? 
                         <ProfileLink to='/profile' activeClassName='activeNav'>
                              <StyledAvatar src={(user && user.profilePicURL) || test} alt=''/>
                              <Typography variant='subtitle2' color='inherit'>
                                   { user && user.name.split(" ")[0] }
                              </Typography>
                              {user && !user.profileCompleted && <span className='red-dot'></span>}
                         </ProfileLink>
                         :
                         <Skeleton width='40px' height='40px' variant='circle' />
                    }
                    <StyledNavLink to='/'>
                         <StyledAvatar>
                              <NotificationsIcon color='inherit'/>
                         </StyledAvatar>
                    </StyledNavLink>
                    <StyledNavLink to='/'>
                         <StyledAvatar>
                              <MoreVertIcon color='inherit'/>
                         </StyledAvatar>
                    </StyledNavLink>
               </Header>
          </Container>     
    )
}

export default MainAppbar;
