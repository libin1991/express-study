import * as constants from '../constants'
import * as basicAction from './innerAction'

// 获取文本列表
// pageNo
// pageSize
export function GetTopicList(data) {
  return (dispatch, getState) => {
    return basicAction.getTopicList(data,dispatch,[call_getTopicList,isNoMoreData]);
  }
}

function call_getTopicList(data) {
  return {
    type:constants.UPDATETOPICLIST,
    data:data
  }
}
function isNoMoreData(isNoData) {
  return {
    type:constants.NOMOREDATA,
    data:isNoData    
  }
}


// 获取banner列表
export function GetBannerList() {
  return (dispatch, getState) => {
    return basicAction.getBannerList(dispatch,[call_getBannerList]);
  }
}

function call_getBannerList(data) {
  return {
    type:constants.GETBANNERLIST,
    data:data
  }
}

//获取文章详情页
export function GetArticleDetail(id) {
  return (dispatch, getState) => {
    return basicAction.getArticleDetail(id,dispatch,[call_getArticleDetail]);
  }
}

function call_getArticleDetail(data){
  return {
    type:constants.UPDATEDETAILINFO,
    data:data
  }
}

//获取文章评论
export function GetComments(id){
  return (dispatch, getState) => {
    return basicAction.getComments(id,dispatch,[call_getComments]);
  }
}
function call_getComments(data){
  return {
    type:constants.UPDATECOMMENTLIST,
    data:data
  }
}

/**
 * 各种表单提交
 * 登录
 * 注册
 * 发表文章
 * 评论提交
 */
export const SubmitData = (type, data) => {
  return (dispatch, getState) => {
    switch (type) {
      case 'login':
        return basicAction.sendLoginInfo(data,dispatch,[UpdateLoginState,UpdateUserInfo]);
      case 'register':
        return basicAction.sendRegisterInfo(data,dispatch,[call_register]);
      case 'addNewTopic':
        return basicAction.addNewTopic(data,dispatch,[call_addNewTopic]);
      case 'addCommentByArticleId':
        return basicAction.addComment(data,dispatch,[call_addComment]);
      default:
        return
    }
  }
}

//注册成功回调
function call_register(data) {
  return {
    type:constants.REGISTER,
    data:data.status
  }  
}

// 添加评论成功
function call_addComment(data) {
  return {
    type: constants.ADDCOMMENT,
    data: data.status
  }
}

// 添加文章
function call_addNewTopic(data) {
  return {
    type: constants.ADDTOPIC,
    data: data.status
  }
}


//更新登录状态
function UpdateLoginState(key) {
  if(key === 'login') {
    return {
      type: constants.LOGIN
    }
  } else if (key === 'logOut'){
    return {
      type : constants.LOGOUT
    }
  }
}

// 判断是否登录成功
export function CheckIsLogin(){
  return (dispatch, getState) => {
    return basicAction.checkIsLogin(dispatch,[UpdateLoginState,UpdateUserInfo]);
  }
}

// 更新用户信息
function UpdateUserInfo(userInfo){
  return {
      type:constants.UPDATEUSERINFO,
      data:userInfo
  }
}

export function LogOut() {
  return (dispatch, getState) => {
    return basicAction.logOut(dispatch,[UpdateLoginState,UpdateUserInfo]);
  }
}


// 获取作者详情，包括文章列表，粉丝数量，关注等
export function getAuthorDetail(userId) {
  return (dispatch, getState) => {
    return basicAction.getAuthorDetail(userId,dispatch,[call_getAuthorDetail]);
  }
}

function call_getAuthorDetail(data) {
  return {
      type:constants.GETAUTHORDETAIL,
      data:data
  }
}

// 关注
export function focus(authorId) {
  return (dispatch,getState) => {
    return basicAction.focus(authorId,dispatch,[call_focus])
  }
}

function call_focus(boolean) {
  return {
       type:constants.FOCUS,
       data:boolean
  }
}


//获取用户个人信息
export function getPersonalInfo() {
  return (dispatch, getState) => {
    return basicAction.getPersonalInfo(dispatch,[call_getPersonalInfo]);
  }
}

function call_getPersonalInfo(data) {
  return {
       type:constants.UPDATEUSERINFO,
       data:data
  }
}

//设置个人信息
export function setPersonalInfo(data) {
  return (dispatch, getState) => {
    return basicAction.setPersonalInfo(data,dispatch,[call_setPersonalInfo]);
  }
}

function call_setPersonalInfo(data) {
  return {
       type:constants.UPDATEUSERINFO,
       data:data
  }
}