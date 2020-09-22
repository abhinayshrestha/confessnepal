import React from 'react'
import { Container, Routes } from './styles'
import MainAppbar from '../../Components/MainAppbar/MainAppbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import NewsFeed from '../../Components/NewsFeed/NewsFeed'

function Home() {
    return (
        <Container>
             <MainAppbar />
             <Routes>
                 <Switch>
                     <Route path='/dashboard/:tag' component={NewsFeed} />
                     <Redirect to='/dashboard/all'/>
                 </Switch>
             </Routes>
        </Container>
    )
}

export default Home
