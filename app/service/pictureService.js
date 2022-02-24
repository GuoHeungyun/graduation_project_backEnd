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
}
module.exports = PictureService;
