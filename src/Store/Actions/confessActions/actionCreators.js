import { LOADING_CONFESS, LOADING_CONFESS_SUCCESS, LOADING_CONFESS_ERROR, POSTING_CONFESS, POSTING_CONFESS_SUCCESS,
         POSTING_CONFESS_ERROR, LOADING_COMMENTS, LOADING_COMMENTS_SUCCESS, LOADING_COMMENTS_ERROR, POSTING_COMMENTS, POSTING_COMMENTS_SUCCESS,
         POSTING_COMMENTS_ERROR, LOADING_REPLIES, LOADING_REPLIES_SUCCESS, LOADING_REPLIES_ERROR, POSTING_REPLIES, POSTING_REPLIES_ERROR,
         POSTING_REPLIES_SUCCESS, UPDATING_CONFESS, UPDATING_CONFESS_ERROR, UPDATING_CONFESS_SUCCESS, UPDATING_COMMENT, UPDATING_COMMENT_ERROR,
         UPDATING_COMMENT_SUCCESS, UPDATING_REPLY, UPDATING_REPLY_SUCCESS, UPDATING_REPLY_ERROR, DELETE_CONFESS_SUCCESS, DELETE_CONFESS_ERROR,
         DELETING_CONFESS, DELETING_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR, DELETING_REPLY, DELETE_REPLY_SUCCESS, DELETE_REPLY_ERROR,
         LIKE_POST, UNLIKE_POST } from './confessActions';
import axios from 'axios'
import { success, postCommentSuccess, postReplySuccess, updateConfessSuccess, updateCommentSuccess, updateReplySuccess, deleteCommentSuccess,
         deleteReplySuccess } from '../snackBarActions/actionCreators'

export const loadConfess = (tags, skipValue) => {
    return (dispatch, getState) => {
        dispatch({ type : LOADING_CONFESS, skipValue : skipValue });
        const token = getState().authReducer.token;
        axios.get(`/post/get-post/${tags}/${skipValue}`,
         { headers : { Authorization : `Bearer ${token}` } })
         .then(res => {
             let data = res.data.map(confess =>{
                            return { ...confess, showComments : false, loading : false }
                        })
                dispatch({ type : LOADING_CONFESS_SUCCESS, confess : data, skipValue : skipValue })
         })
         .catch(err => {
             dispatch({ type : LOADING_CONFESS_ERROR })
         })
    }
}

export const postConfess = data => {
    return (dispatch, getState) => {
        dispatch({ type : POSTING_CONFESS });
        const token = getState().authReducer.token;
        axios.post(`/post/create-post`, { ...data } ,
         { headers : { Authorization : `Bearer ${token}` } })
         .then(res => {
             const post = {
                 _id : res.data._id,
                 shares : 0,
                 timeStamp : res.data.timeStamp,
                 createdAt : res.data.createdAt,
                 content : res.data.content,
                 likesCount : 0,
                 commentsCount : 0,
                 isPrivate : res.data.isPrivate,
                 showComments : false,
                 tags : res.data.tags,
                 loading : false,
                 user : {
                     _id : getState().userReducer.user._id,
                     name : res.data.isPrivate ? "Anonymous" : getState().userReducer.user.name,
                     profilePicURL : res.data.isPrivate ? null : getState().userReducer.user.profilePicURL,
                 }
             }
             dispatch({ type : POSTING_CONFESS_SUCCESS, post : post});
             dispatch(success());
         })
         .catch(err => {
             dispatch({ type : POSTING_CONFESS_ERROR });
         })
    }
}

export const loadComments = (postId, index, skipValue) => {
     return (dispatch, getState) => {
         dispatch({ type : LOADING_COMMENTS, index : index });
         const token = getState().authReducer.token;
         axios.get(`/post/comment/${postId}&${skipValue}`, {
                headers : { Authorization : `Bearer ${token}`}
            })
            .then(res => {
                let data = res.data.map(comment =>{
                    return { ...comment, showReplies : false, loading : false }
                })
                dispatch({ type : LOADING_COMMENTS_SUCCESS, comments : data, postId : postId, index : index })
            })
            .catch(err => {
                console.log(err.response);
                dispatch({ type : LOADING_COMMENTS_ERROR })
            })
     }
}

export const postComment = (postId, comment) => {
    return (dispatch, getState) => {
        dispatch({ type : POSTING_COMMENTS });
        const token = getState().authReducer.token;
        axios.post(`/post/comment`, { postId, comment },
             { headers : { Authorization : `Bearer ${token}` } })
          .then(res => {
              const comment = {
                  comments : {
                    _id : res.data.comment._id,
                    user : {
                        _id : res.data.comment.user,
                        name : res.data.comment.isPrivate ? "Anonymous" : getState().userReducer.user.name,
                        profilePicURL : res.data.comment.isPrivate ? false : getState().userReducer.user.profilePicURL
                    },
                    comment : res.data.comment.comment,
                    isPrivate : res.data.comment.isPrivate,
                    createdAt : res.data.comment.createdAt,
                  },
                  repliesCount : 0,
                  showReplies : false,
                  loading : false
              }
              dispatch({ type : POSTING_COMMENTS_SUCCESS, comment : {...comment}, postId : postId })
              dispatch(postCommentSuccess());
          })   
          .catch(err => {
              dispatch({ type : POSTING_COMMENTS_ERROR })
              console.log(err.response);
          })
    }
}

export const loadReplies = (commentId, postId, index) => {
    return (dispatch, getState) => {
        dispatch({ type : LOADING_REPLIES, commentId });
        const token = getState().authReducer.token;
            axios.get(`/post/replies/${commentId}&${postId}`,
                { headers  : { Authorization : `Bearer ${token}` } })
                .then(res => {
                    let replies = res.data.map(reply => {
                        return { ...reply.comments.replies }
                    })
                    dispatch({ type : LOADING_REPLIES_SUCCESS, replies : replies, postId : postId, index : index, commentId : commentId })
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type : LOADING_REPLIES_ERROR })
                })
    }
}

export const postReply = (payload, info) => {
    return (dispatch, getState) => {
        dispatch({ type : POSTING_REPLIES });
        const token = getState().authReducer.token;
        axios.post(`/post/reply`, { ...payload },
                { headers : { Authorization : `Bearer ${token}` } })
              .then(res => {
                  let replies = {
                      ...res.data,
                      mentioned : res.data.isMentionedPrivate ? { _id : info.user._id, name : 'Anonymous'  } : { _id : info.user._id, name : info.user.name, profilePicURL : info.user.profilePicURL },
                      repliedBy : res.data.isrepliedByPrivate ? { _id : getState().userReducer.user._id, name : 'Anonymous'  } : { _id : getState().userReducer.user._id, name : getState().userReducer.user.name, profilePicURL : getState().userReducer.user.profilePicURL },
                  }
                  dispatch({ type : POSTING_REPLIES_SUCCESS, replies : replies, postId : payload.postId, commentId : payload.commentId });
                  dispatch(postReplySuccess());
              })
              .catch(err => {
                  console.log(err);
                  dispatch({ type : POSTING_REPLIES_ERROR })
              })  
    }
}

export const updateConfess = payload => {
    return (dispatch, getState) => {
        dispatch({ type : UPDATING_CONFESS, id : payload.postId })
        const token = getState().authReducer.token;
        axios.patch(`/post/edit/confess`, { ...payload },
                { headers : { Authorization : `Bearer ${token}` } })
             .then(res => {
                 dispatch({ type : UPDATING_CONFESS_SUCCESS, payload : res.data })
                 dispatch(updateConfessSuccess());
             })   
             .catch(err => {
                 dispatch({ type : UPDATING_CONFESS_ERROR });
                 console.log(err);
             })
    }
}

export const updateComment = payload => {
    return (dispatch, getState) => {
        dispatch({ type : UPDATING_COMMENT });
        const token = getState().authReducer.token;
        axios.patch(`/post/edit/comment`,{ ...payload },
                { headers : { Authorization : `Bearer ${token}` } })
             .then(res => {
                dispatch({ type : UPDATING_COMMENT_SUCCESS, payload : payload })
                dispatch(updateCommentSuccess());
             })
             .catch(err => {
                 dispatch({ type : UPDATING_COMMENT_ERROR });
                 console.log(err);
             })
    }
}

export const updateReply = (payload, commentId) => {
    return (dispatch, getState) => {
        dispatch({ type : UPDATING_REPLY });
        const token = getState().authReducer.token;
        axios.patch(`/post/edit/reply`, { ...payload },
            { headers : { Authorization : `Bearer ${token}` } })
            .then(res => {
                dispatch({ type : UPDATING_REPLY_SUCCESS, payload : payload, commentId : commentId })
                dispatch(updateReplySuccess());
            })
            .catch(err => {
                dispatch({ type : UPDATING_REPLY_ERROR });
                console.log(err);
            })
    }
}

export const deleteConfess = id => {
    return (dispatch, getState) => {
        dispatch({ type : DELETING_CONFESS });
        const token = getState().authReducer.token;
        axios.delete(`/post/delete/post/${id}`,
             { headers : { Authorization : `Bearer ${token}` } })
             .then(res => {
                 dispatch({ type : DELETE_CONFESS_SUCCESS, id : id })
             })
             .catch(err => {
                dispatch({ type : DELETE_CONFESS_ERROR })
                 console.log(err);
             })
    }
}

export const deleteComment = (commentId, postId) => {
    return (dispatch, getState) => {
        dispatch({ type : DELETING_COMMENT });
        const token = getState().authReducer.token;
        axios.delete(`/post/delete/comment/${commentId}`,
             { headers : { Authorization : `Bearer ${token}` } })
             .then(res => {
                 dispatch({ type : DELETE_COMMENT_SUCCESS, commentId : commentId, postId : postId })
                 dispatch(deleteCommentSuccess());
             })
             .catch(err => {
                dispatch({ type : DELETE_COMMENT_ERROR })
                 console.log(err);
             })
    }
}

export const deleteReply = (replyId, commentId) => {
    return (dispatch, getState) => {
        dispatch({ type : DELETING_REPLY });
        const token = getState().authReducer.token;
        axios.delete(`/post/delete/reply/${replyId}`,
             { headers : { Authorization : `Bearer ${token}` } })
             .then(res => {
                 dispatch({ type : DELETE_REPLY_SUCCESS, replyId : replyId, commentId : commentId })
                 dispatch(deleteReplySuccess())
             })
             .catch(err => {
                dispatch({ type : DELETE_REPLY_ERROR })
                 console.log(err);
             })
    }
}

export const likePost = postId => {
    return (dispatch, getState) => {
        dispatch({ type : LIKE_POST, postId : postId });
        const token = getState().authReducer.token;
        axios.patch(`/post/like/post/${postId}`, null,
            { headers : { Authorization : `Bearer ${token}` } })
            .then(_ => {
                
            })
            .catch(err => {

            })
    }
}

export const unlikePost = postId => {
    return (dispatch, getState) => {
        dispatch({ type : UNLIKE_POST, postId : postId });
        const token = getState().authReducer.token;
        axios.patch(`/post/unlike/post/${postId}`, null,
            { headers : { Authorization : `Bearer ${token}` } })
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            })
    }
}