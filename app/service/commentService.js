const Service = require('egg').Service;

class CommentService extends Service {
  //新增评论
  async createComment(params){
    console.log(params);
    let queryStr = `INSERT INTO comments ( targetType, creatorId, content, type, targetId )
        values ('${params.targetType}', '${params.creatorId}', '${params.content}','${params.type}','${params.targetId}')`
    const answer = await this.app.model.query(queryStr);
    return answer[0]
  }
}

module.exports = CommentService;
