import React from 'react'
import { Container, Header } from './styles'
import logo from '../../Assets/logo.png'
import { Grid } from '@material-ui/core'
import About from '../../Components/About/About'

function Login() {
    return (
        <Container>
            <Header square elevation={0}>
                <img src={logo} alt='' style={{ maxWidth : '130px' }}/>
            </Header>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <About />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login
