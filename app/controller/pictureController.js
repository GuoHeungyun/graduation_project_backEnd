const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class PictureController extends Controller {
  //上传头像
  async uploadAvatar(){
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    //删除原头像
    //删除路径中的 'controller'
    let pathArr = __dirname.split('\\');
    pathArr.pop();
    let imgPath = pathArr.join('/')
    fs.unlinkSync(`${imgPath}/${stream.fields.avatar}`);
    //要传的参数对象
    const userdata = {};
    userdata.phone = stream.fields.phone;
    //新建一个文件名
    const filename = md5(stream.filename)+new Date().getTime()+ path
      .extname(stream.filename)
      .toLocaleLowerCase();
    //文件路径
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    userdata.path = 'public/' + filename;
    //文件响应
    ctx.body = await ctx.service.pictureService.updateAvatar(userdata)
    // ctx.body = {
    //   url: '/public/' + filename
    // };
  }
}
module.exports = PictureController;
