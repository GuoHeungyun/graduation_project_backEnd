'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/find',controller.home.findUser);
  router.post('/login/finduser',controller.loginController.findUser)      //查找用户
  router.post('/login/insertuser',controller.loginController.insertUser)  //插入用户
  router.post('/login/updateusername', controller.loginController.updateUsername)   //更新用户名
  router.post('/login/updatephone', controller.loginController.updatePhone) //更新用户手机号
  router.post('/login/updatepassword', controller.loginController.updatePassword) //修改用户密码
  router.post('/login/updateintroduction', controller.loginController.updateIntroduction) //修改个人简介

  router.post('/people/upload', controller.pictureController.uploadAvatar) //上传头像
  router.post('/upload_img',controller.pictureController.uploadImg) //上传图片
  router.post('/create_question',controller.questionController.createQuestion) //新增问题
  router.post('/get_question',controller.questionController.getQuestion) //获取问题
};
