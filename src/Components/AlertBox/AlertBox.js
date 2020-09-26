import React, { useEffect } from 'react'
import { DialogActions, Button, DialogTitle, DialogContentText, DialogContent, CircularProgress } from '@material-ui/core'
import { StyledDialog } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { deleteConfess, deleteComment, deleteReply } from '../../Store/Actions/confessActions/actionCreators'

function AlertBox({ action, id, closeHandler, postId, commentId }) {

    const { deleteLoader } = useSelector(state => state.confessReducer);
    const { success } = useSelector(state => state.snackBarReducer);
    const dispatch = useDispatch();

    const onAction = () => {
        switch(action) {
            case 'deleteConfess' :
                dispatch(deleteConfess(id))
                break;
            case 'deleteComment' :
                dispatch(deleteComment(id, postId)) 
                break;
            case 'deleteReply' :
                dispatch(deleteReply(id, commentId));
                break;    
            default : return;
        }
    }

    useEffect(() => {
       if(success.deleteComment.value){
            closeHandler();
       } 
       if(success.deleteReply.value){
        closeHandler();
   } 
    }, [success.deleteComment, closeHandler, success.deleteReply])

    return (
        <StyledDialog
        open={true}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            {action=== 'deleteConfess' && <DialogTitle id="alert-dialog-title">{"Delete Confession?"}</DialogTitle>}
            {action=== 'deleteComment' && <DialogTitle id="alert-dialog-title">{"Delete Comment?"}</DialogTitle>}
            {action=== 'deleteReply' && <DialogTitle id="alert-dialog-title">{"Delete Reply?"}</DialogTitle>}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this {action=== 'deleteConfess' ? 'confession' : action === 'deleteComment' ? 'comment' : action === 'deleteReply' ? 'reply' : '' }?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
               {deleteLoader && <CircularProgress size={22}/> }   
                <Button size='small' onClick={closeHandler} disabled={deleteLoader}>
                    Cancel
                </Button>
                <Button color="secondary" 
                        size='small' 
                        variant="contained" 
                        onClick={onAction} 
                        disableElevation 
                        disabled={deleteLoader}>
                    Delete
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default AlertBox
