const User = require('../api/user');

module.exports = {
  // 获取用户个人信息
  setProfile(req,res,next){
     if(req.session.user){
       var id = req.session.user._id;
       User.getUserById(id)
       .then(user => {
          if(user){
            return res.render('user/edit',{
              user:user
            })
          }
       })
     }
  },
  // 个人资料设置,这里暂时还有问题
  edit(req,res,next) {
    if(req.session.user) {
      var id = req.session.user._id;
      User.getUserById(id)
      .then(user => {
        if(user){
          user.profile_image_url = req.body.headerimage;
          user.email = req.body.email;
          user.sigature = req.body.sigature;
          user.location = req.body.address;
          user.loginname = req.body.name;
          user.password = req.body.password;
          User.updateData({_id:id},user,{upsert: true})
          .then(result => {
            if(result.ok == 1){
              req.session.user = user;
              return res.redirect('/setProfile');
            }else{
              return res.send('抱歉，更新数据失败');
            }

          })
        }
      })
    }
  }
}
