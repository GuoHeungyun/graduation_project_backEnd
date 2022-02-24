const Controller = require('egg').Controller;

class LoginController extends Controller {
  async findUser() {
    this.ctx.body=await this.ctx.service.loginService.findUser(this.ctx.request.body)
  }
  async insertUser() {
    this.ctx.body=await this.ctx.service.loginService.insertUser(this.ctx.request.body)
  }
  async updateUsername(){
    this.ctx.body=await this.ctx.service.loginService.updateUsername(this.ctx.request.body)
  }
  async updatePhone(){
    this.ctx.body=await this.ctx.service.loginService.updatePhone(this.ctx.request.body)
  }
  async updatePassword(){
    this.ctx.body=await this.ctx.service.loginService.updatePassword(this.ctx.request.body)
  }
  async updateIntroduction(){
    this.ctx.body=await this.ctx.service.loginService.updateIntroduction(this.ctx.request.body)
  }
}
module.exports = LoginController;
