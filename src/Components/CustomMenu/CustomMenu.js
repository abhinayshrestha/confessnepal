import React from 'react'
import { Container, List } from './styles'
import { Typography, Divider, ClickAwayListener } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';

const slideVariants = {
    from : { opacity : 0, y : 20 },
    to : {
        opacity : 1,
        y : 0,
        transition : {
            type : 'tween',
            duration : 0.1
        }
    }
}

function CustomMenu({ close, isPrivate }) {
    return (
        <ClickAwayListener onClickAway={close.bind(null, isPrivate)}>
            <Container variants={slideVariants} initial='from' animate='to' elevation={15}>
                <List onClick={close.bind(null, true)}>
                    <Typography variant='subtitle2' color='textPrimary' gutterBottom>
                        Anonymous  {isPrivate  && <CheckIcon fontSize='small'/>}
                    </Typography>
                    <Typography variant='subtitle2' color='textSecondary' 
                                style={{ fontSize : '0.77rem', fontWeight : '400' }}>
                        Your identity will be hidden and your post will be shown as anonymous.
                    </Typography>
                </List>
                <Divider/>
                <List onClick={close.bind(null, false)}>
                    <Typography variant='subtitle2' color='textPrimary' gutterBottom>
                        Public {!isPrivate  && <CheckIcon fontSize='small'/>}
                    </Typography>
                    <Typography variant='subtitle2' color='textSecondary' 
                                style={{ fontSize : '0.77rem', fontWeight : '400' }}>
                        Your confession will be shared publicly and your name will appear in your confession.
                    </Typography>
                </List>
            </Container>
        </ClickAwayListener>
    )
}

export default CustomMenu
