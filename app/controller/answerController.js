const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class AnswerController extends Controller {
  //新增回答
  async createAnswer(){
    this.ctx.body = await this.ctx.service.answerService.createAnswer(this.ctx.request.body)
  }

  //获取回答
  async getAnswer(){
    this.ctx.body = await this.ctx.service.answerService.getAnswer(this.ctx.request.body)
  }
}

module.exports = AnswerController;
