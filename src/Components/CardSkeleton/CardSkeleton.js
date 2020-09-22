import React from 'react'
import { Container } from './styles'
import { Skeleton } from '@material-ui/lab'

function CardSkeleton() {
    return (
        <Container>
             <div className='top'>
                 <Skeleton height='40px' width='40px' variant='circle'/>
                 <div style={{ marginLeft : '10px' }}>
                        <Skeleton height='10px' width='100px' variant='rect' style={{ borderRadius : '10px' }}/>
                        <Skeleton height='10px' width='60px' variant='rect' style={{ marginTop : '10px', borderRadius : '10px'  }}/>
                 </div>
             </div>
             <div className='center'/>
             <div className='bottom'>
                <Skeleton height='10px' width='100px' variant='rect' style={{ borderRadius : '10px' }}/>
                <Skeleton height='10px' width='100px' variant='rect' style={{ borderRadius : '10px', marginLeft : '10px' }}/>
             </div>
        </Container>
    )
}

export default CardSkeleton
