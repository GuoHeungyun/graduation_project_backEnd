const Service = require('egg').Service;

class PictureService extends Service {
  async updateAvatar(userdata){
    let queryStr = `update users set user_avatar = '${userdata.path}' where phone = '${userdata.phone}'`;
    // return await this.ctx.model.user.create({
    //   path
    // })
    await this.app.model.query(queryStr);
    return userdata.path;
  }

  //上传图片
  async uploadImg(paramData){
    return {
      "errno":0,
      "data":[
        `http://127.0.0.1:7001/${paramData.path}`,
      ]
    }
  }
}
module.exports = PictureService;
