import React from 'react'
import { Container, Confessions } from './styles'
import Categories from '../Categories/Categories'
import ConfessionTopBar from '../ConfessionTop/ConfessionTop'
import Ads from '../Ads/Ads'
import ConfessCard from '../ConfessCard/ConfessCard'

function NewsFeed() {

    return (
        <Container>
             <Categories />
             <Confessions>
                 <ConfessionTopBar />
                 <ConfessCard />
             </Confessions>
             <Ads />
        </Container>
    )
}

export default NewsFeed
