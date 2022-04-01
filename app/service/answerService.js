const Service = require('egg').Service;

class AnswerService extends Service {

  //新增回答
  async createAnswer(params){
    let queryStr = `insert into answers (content, excerpt, creatorId, type, targetId)
        values ('${params.content}', '${params.excerpt}', '${params.creatorId}','2','${params.targetId}')`
    const answer = await this.app.model.query(queryStr);
    return answer
  }

  //获取回答
  async getAnswer(params){
    let queryStr = ''
    if (!Object.getOwnPropertyNames(params).length){  //如果没有参数进来，查询全部
      queryStr = 'SELECT\n' +
        '\tanswers.answer_id,\n' +
        '\tanswers.content as answerContent,\n' +
        '\tanswers.excerpt as answerExcerpt,\n' +
        '\tanswers.updatedAt as answerUpdate,\n' +
        '\tusers.user_id as answerAuthorId,\n' +
        '\tusers.username,\n' +
        '\tusers.user_avatar,\n' +
        '\tusers.introduction,\n' +
        '\tquestions.creatorId as questionAuthorId,\n' +
        '\tquestions.question_id,\n' +
        '\tquestions.title as questionTitle,\n' +
        '\tquestions.description as questionDescription,\n' +
        '\tquestions.updatedAt as questionUpdate,\n' +
        '\tquestions.excerpt as questionExcerpt\n' +
        'FROM\n' +
        '\tanswers , questions, users\n' +
        'WHERE\n' +
        '\tanswers.creatorId = users.user_id\n' +
        'AND\n' +
        '\tanswers.targetId = question_id\n' +
        'ORDER BY\n' +
        '\tanswers.updatedAt DESC'
      const answer = await this.app.model.query(queryStr);
      return answer[0]
    }else{  //否则按id查询
      queryStr = `SELECT users.user_id, users.username, users.user_avatar, users.introduction, answers.answer_id, answers.content,answers.excerpt, answers.creatorId, answers.updatedAt, answers.targetId 
FROM users join answers
ON users.user_id = answers.creatorId
WHERE answers.targetId = '${params.id}'`
      const answer = await this.app.model.query(queryStr);
      return answer[0]
    }
  }

}

module.exports = AnswerService;
