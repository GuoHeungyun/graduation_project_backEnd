const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class QuestionController extends Controller {
  //新增问题
  async createQuestion(){
    this.ctx.body = await this.ctx.service.questionService.createQuestion(this.ctx.request.body)
  }

  //获取问题
  async getQuestion(){
    this.ctx.body = await this.ctx.service.questionService.getQuestion(this.ctx.request.body)
  }
}
module.exports = QuestionController;
