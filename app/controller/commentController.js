const Controller = require('egg').Controller;

class CommentController extends Controller{
  //新增评论
  async createComment() {
    console.log('新增评论');
    this.ctx.body = await this.ctx.service.commentService.createComment(this.ctx.request.body)
  }
}

module.exports = CommentController;
