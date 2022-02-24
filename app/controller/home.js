'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async findUser(){
    const { ctx } = this;
    const user = await ctx.model.Test.findOne({
      where:{
        name: "张三"
      }
    })
    if (user){
      ctx.body = '找到了'
    }else {
      ctx.body = '没找到'
    }
  }
}

module.exports = HomeController;
