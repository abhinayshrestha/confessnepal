import React, { useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import Login from './Login/Login';
import Home from './Home/Home';
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from '../Store/Actions/authActions/actionCreators'

function App() {

  const isAuth = useSelector(state => state.authReducer.token !== null);
  const dispatch = useDispatch();

  const theme = createMuiTheme({
    palette : {
        type : 'dark',
        primary : {
            main : '#00a0b2'
        },
        secondary : {
          main : '#cd3928',
        },
        background : {
          default : '#18191a',
          paper : '#242526'
        },
        text : {
          primary : '#dddde4'
        }
    }
  })

  useEffect(() => {
     dispatch(checkAuth());
  }, [dispatch])

  return (
          <MuiThemeProvider theme={theme} >  
              <ThemeProvider theme={theme} >
                { isAuth ? <Home /> : <Login />}
              </ThemeProvider> 
          </MuiThemeProvider> 
     );
}

export default App;