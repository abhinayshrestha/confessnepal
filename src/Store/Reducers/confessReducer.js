import { LOADING_CONFESS, LOADING_CONFESS_SUCCESS, LOADING_CONFESS_ERROR, POSTING_CONFESS, POSTING_CONFESS_SUCCESS,
         POSTING_CONFESS_ERROR, LOADING_COMMENTS, LOADING_COMMENTS_SUCCESS, LOADING_COMMENTS_ERROR, POSTING_COMMENTS, POSTING_COMMENTS_SUCCESS,
         POSTING_COMMENTS_ERROR, LOADING_REPLIES, LOADING_REPLIES_SUCCESS, LOADING_REPLIES_ERROR, POSTING_REPLIES, POSTING_REPLIES_SUCCESS,
         POSTING_REPLIES_ERROR, UPDATING_CONFESS_ERROR, UPDATING_CONFESS, UPDATING_CONFESS_SUCCESS,UPDATING_COMMENT, UPDATING_COMMENT_ERROR,
         UPDATING_COMMENT_SUCCESS, UPDATING_REPLY, UPDATING_REPLY_SUCCESS, UPDATING_REPLY_ERROR,  DELETE_CONFESS_SUCCESS, DELETE_CONFESS_ERROR,
         DELETING_CONFESS, DELETING_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR, DELETING_REPLY, DELETE_REPLY_SUCCESS, DELETE_REPLY_ERROR,
         LIKE_POST, UNLIKE_POST  } from '../Actions/confessActions/confessActions';

const initState = {
    confess : [],
    confessLoader : false,
    posting : false,
    loadingComments : false,
    comments : {},
    postingComment : false,
    replies : {},
    loadingReplies : { value : false, id : '' },
    postingReplies : false,
    updatingConfess : { value : false, id : '' },
    updatingComment : false,
    updatingReply : false,
    deleteLoader : false
}

export const confessReducer = (state = initState, action) => {
    switch(action.type) {
        case LOADING_CONFESS :
                            return {
                                ...state,
                                confessLoader : true
                            }
        case LOADING_CONFESS_SUCCESS :
                            return {
                                ...state,
                                confessLoader : false,
                                confess : [...action.confess]
                            }
        case LOADING_CONFESS_ERROR : 
                            return {
                                ...state,
                                confessLoader : false
                            }
        case POSTING_CONFESS :
                            return {
                                ...state,
                                posting : true
                            }
        case POSTING_CONFESS_SUCCESS : 
                            const newConfess = [...state.confess];
                            newConfess.unshift(action.post)
                            return {
                                ...state,
                                posting : false,
                                confess : [...newConfess]
                            }
        case POSTING_CONFESS_ERROR :
                            return {
                                ...state,
                                posting : false
                            }
        case LOADING_COMMENTS :
                            let confess = [...state.confess];
                            confess[action.index].loading = true;
                            return {
                                ...state,
                                confess : [...confess]
                            }
        case LOADING_COMMENTS_SUCCESS :
                            let updatedConfess = [...state.confess];
                            updatedConfess[action.index].showComments = true;
                            updatedConfess[action.index].loading = false;
                            return {
                                ...state,
                                confess : [...updatedConfess],
                                loadingComments : false,
                                comments : {
                                    ...state.comments,
                                    [action.postId] : state.comments[action.postId] ? state.comments[action.postId].concat(action.comments) : [...action.comments]
                                }
                            }
        case LOADING_COMMENTS_ERROR :
                            return {
                                ...state,
                                loadingComments : false
                            }    
        case POSTING_COMMENTS :
                            return {
                                ...state,
                                postingComment : true
                            }
        case POSTING_COMMENTS_SUCCESS :    
                            const postIndex = [...state.confess].findIndex(con => con._id === action.postId);
                            const arr = [...state.confess];
                            arr[postIndex].commentsCount = arr[postIndex].commentsCount + 1;
                            arr[postIndex].showComments = true;
                            if(postIndex > -1){
                                return {
                                    ...state,
                                    confess : [...arr],
                                    postingComment : false,
                                    comments : {
                                        ...state.comments,
                                        [action.postId] : state.comments[action.postId] ? state.comments[action.postId].concat(action.comment) : [action.comment]
                                    }
                                }
                            }
                            return {
                                ...state,
                                postingComment : false,
                                comments : {
                                    ...state.comments,
                                    [action.postId] : state.comments[action.postId] ? state.comments[action.postId].concat(action.comment) : [action.comment]
                                }
                            }
        case POSTING_COMMENTS_ERROR :
                            return {
                                ...state,
                                postingComment : false
                            }
        case LOADING_REPLIES : 
                            return {
                                ...state,
                                loadingReplies : {
                                    ...state.loadingReplies,
                                    value : true,
                                    id : action.commentId
                                }
                            }
        case LOADING_REPLIES_SUCCESS : 
                            let updatedComments = [...state.comments[action.postId]];
                            updatedComments[action.index].showReplies = true;
                            return {
                                ...state,
                                loadingReplies : {
                                    ...state.loadingReplies,
                                    value : false,
                                    id : ''
                                },
                                comments : {
                                    ...state.comments,
                                    [action.postId] : [...updatedComments]
                                },
                                replies : {
                                    ...state.replies,
                                    [action.commentId] : [...action.replies]
                                }
                            }
        case LOADING_REPLIES_ERROR : 
                            return {
                                ...state,
                                loadingReplies : false
                            }
        case POSTING_REPLIES :
                            return {
                                ...state,
                                postingReplies : true
                            }
        case POSTING_REPLIES_SUCCESS :
                            const i = [...state.comments[action.postId]].findIndex(con => con.comments._id === action.commentId);
                            let setComments = [...state.comments[action.postId]];
                            setComments[i].showReplies = true;
                            console.log(i);
                            return {
                                ...state,
                                postingReplies : false,
                                 comments : {
                                    ...state.comments,
                                    [action.postId] : [...setComments]
                                },
                                replies : {
                                    ...state.replies,
                                    [action.commentId] : state.replies[action.commentId] ? state.replies[action.commentId].concat(action.replies) : [{ ...action.replies }]
                                }
                            }
        case POSTING_REPLIES_ERROR :
                            return {
                                ...state,
                                postingReplies : false
                            }
        case UPDATING_CONFESS :
                            return {
                                ...state,
                                updatingConfess : {
                                    value : true,
                                    id : action.id
                                }
                            }
        case UPDATING_CONFESS_SUCCESS :
                            const confessIndex = [...state.confess].findIndex(con => con._id === action.payload._id)
                            let conList = [...state.confess];
                            conList[confessIndex].content = action.payload.content;
                            conList[confessIndex].tags = action.payload.tags;
                            conList[confessIndex].isPrivate = action.payload.isPrivate;
                            return {
                                ...state,
                                confess : [...conList],
                                updatingConfess : {
                                    value : false,
                                    id : ''
                                }
                            }
        case UPDATING_CONFESS_ERROR :
                            return {
                                ...state,
                                updatingConfess : {
                                    value : false,
                                    id : ''
                                }
                            }
        case UPDATING_COMMENT : 
                            return {
                                ...state,
                                updatingComment : true
                            }
        case UPDATING_COMMENT_SUCCESS :
                           const cIndex = state.comments[action.payload.postId].findIndex(comment => comment.comments._id === action.payload.commentId);
                           let nComment = [...state.comments[action.payload.postId]];
                           nComment[cIndex].comments.comment = action.payload.comment;
                           return {
                               ...state,
                               updatingComment : false,
                               comments : {
                                   ...state.comments,
                                   [action.payload.postId] : nComment
                               }
                           }
        case UPDATING_COMMENT_ERROR :
                           return {
                               ...state,
                               updatingComment : false
                           }
        case UPDATING_REPLY : 
                         return {
                             ...state,
                             updatingReply : true
                         }  
        case UPDATING_REPLY_SUCCESS :
                        const rIndex = state.replies[action.commentId].findIndex( reply => reply._id === action.payload.replyId );
                        let nReply = [...state.replies[action.commentId]];
                        nReply[rIndex].reply = action.payload.reply  
                         return {
                            ...state,
                            updatingReply : false,
                            replies : {
                                ...state.replies,
                                [action.commentId] : nReply
                            }
                         }
        case UPDATING_REPLY_ERROR :
                         return {
                             ...state,
                             updatingReply : false
                         }
        case DELETING_CONFESS : 
                         return {
                             ...state,
                             deleteLoader : true
                         }
        case DELETE_CONFESS_SUCCESS :
                         const deleteIndex = state.confess.findIndex(con => con._id === action.id);
                         let newCon = [...state.confess];
                         newCon.splice(deleteIndex, 1);
                         if(deleteIndex > -1) {
                            return {
                                ...state,
                                deleteLoader : false,
                                confess : newCon
                            }
                         }
                         return {
                             ...state
                         }
        case DELETE_CONFESS_ERROR :
                        return {
                            ...state,
                            deleteLoader : false
                        }       
        case DELETING_COMMENT :
                        return {
                            ...state,
                            deleteLoader : true
                        }
        case DELETE_COMMENT_SUCCESS :
                        const dcI = state.comments[action.postId].findIndex( com => com.comments._id === action.commentId );
                        const cI = state.confess.findIndex(con => con._id === action.postId);
                        let nCon = [...state.confess];
                        nCon[cI].commentsCount = nCon[cI].commentsCount - 1;
                        let nC = [...state.comments[action.postId]];
                        nC.splice(dcI, 1);
                        if(dcI > -1) {
                            return {
                                ...state,
                                deleteLoader : false,
                                confess : nCon,
                                comments : {
                                    ...state.comments,
                                    [action.postId] : nC 
                                }
                            }
                        }
                        return {
                            ...state,
                            deleteLoader : false
                        }
        case DELETE_COMMENT_ERROR :
                        return {
                            ...state,
                            deleteLoader : false
                        }
        case DELETING_REPLY :
                        return {
                            ...state,
                            deleteLoader : true
                        }
        case DELETE_REPLY_SUCCESS :
                        const rI = state.replies[action.commentId].findIndex(reply => reply._id === action.replyId);
                        let nR = [...state.replies[action.commentId]];
                        if(rI > -1){
                            nR.splice(rI, 1); 
                            return {
                                ...state,
                                deleteLoader : false,
                                replies : {
                                    ...state.replies,
                                    [action.commentId] : nR
                                }
                            }
                        }
                        return {
                            ...state,
                            deleteLoader : false
                        }
        case DELETE_REPLY_ERROR :
                        return {
                            ...state,
                            deleteLoader : false
                        }
        case LIKE_POST :
                    const lIndex = state.confess.findIndex(con => con._id === action.postId);
                    let lConfess = [...state.confess];
                    lConfess[lIndex].liked = true       
                    lConfess[lIndex].likesCount = lConfess[lIndex].likesCount + 1;       
                    return{
                        ...state,
                        confess : lConfess
                    }
        case UNLIKE_POST :
                    const unlIndex = state.confess.findIndex(con => con._id === action.postId);
                    let unlConfess = [...state.confess];
                    unlConfess[unlIndex].liked = false       
                    unlConfess[unlIndex].likesCount = unlConfess[unlIndex].likesCount - 1;       
                    return{
                        ...state,
                        confess : unlConfess
                    }
        default : return state;
    }
}