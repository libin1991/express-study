var express = require('express');
var router = express.Router();
const config = require('../config');
const sign = require('../controllers/sign');
const site = require('../controllers/site');
const topic = require('../controllers/topic');
const user = require('../controllers/user');
const reply = require('../controllers/reply');
const collect = require('../controllers/collect');
const author = require('../controllers/author');
const upload = require('../common/uploadPic'); // 图片上传

const API = '/api';

// 注册，登录，退出
router.post(API + '/register',sign.register);   //用户注册
router.post(API + '/login',sign.login);        //用户登录
router.post(API + '/logout',sign.logout);     //用户登出
// 文章类
router.post(API + '/addNewTopic',topic.addNewTopic);            // 新建文章
router.get(API + '/getArticleDetail',topic.getArticleDetail);  //获取文章详情
router.get(API + '/getTopicList',topic.getTopicList);         //获取所有文章列表
router.post(API + '/delArticleById',topic.delArticleById);   //删除选中的文章
router.post(API + '/updateArticle',topic.updateArticle);    //更新文章
router.get(API + '/search',topic.search);    //搜索文章
router.get(API + '/findArticleByType',topic.findArticleByType);    //根据文章分类筛选文章
router.get(API + '/getHotArticle',topic.getHotArticle);    // 获取热门文章
// 评论类
router.post(API + '/addCommentByArticleId',reply.add); // 新增文章评论
router.get(API + '/getComments',reply.getComments);   // 获取某偏文章的所有评论
router.post(API + '/delComment',reply.delComment);   // 删除某条评论
// 收藏类
router.post(API + '/addCollect',collect.addCollect);  // 添加收藏
router.get(API + '/hadCollect',collect.hadCollect);  // 判断是否已收藏
router.get(API + '/unCollect',collect.unCollect);   // 取消收藏
//作者中心
router.get(API + '/getAuthorCenter',author.getAuthorCenter);  //获取作者中心
router.get(API + '/getCollectList',author.getCollectList);   // 获取作者收藏的列表
// 个人信息
router.get(API + '/getUserInfo',user.getUserInfo);     //获取个人信息
router.post(API + '/setUserInfo',user.setUserInfo);    // 设置个人信息
router.post(API + '/uploadHeadPic',user.uploadHeadPic);   //图片上传
router.post(API + '/changePass',user.changePass);    //修改密码
router.get(API + '/getUserId',user.getUserId);    // 获取用户uid
router.get(API + '/checkIsLogin',user.checkIsLogin);    // 检查用户是否登录了
// 公共类
router.post(API + '/uploadPic',topic.uploadArticlePic);   //图片上传，公共上传

// 关注作者，取消关注作者
router.post(API + '/focusAuthor',author.focusAuthor);         //关注作者
router.post(API + '/unfocusAuthor',author.unfocusAuthor);    //取消关注作者
router.post(API + '/hadFocus',author.hadFocus);    //是否已关注作者

// 测试接口地址，改为前后端分离的模式，后端只生产数据，前端这样以后前端可以用任何的框架来做，分离解耦
router.get('/testApi',(req,res,next) => {
	 res.render('site/testApi',{});
});
// room page
router.get('/room/:roomID', function (req, res) {
  var roomID = req.params.roomID;

  // 渲染页面数据(见views/room.hbs)
  res.render('site/socket', {
    roomID: roomID
    // users: roomInfo[roomID]
  });
});

router.get('/testApi2',(req,res,next) => {
	 res.render('site/testApi2',{});
});

module.exports = router;
