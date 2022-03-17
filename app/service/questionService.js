const Service = require('egg').Service;

class QuestionService extends Service {
  //新增问题
  async createQuestion(questionData){
    let queryStr = `insert into questions (title, description, creatorId, excerpt, type) 
        values ('${questionData.title}', '${questionData.description}','${questionData.creatorId}', '${questionData.excerpt}','1')`
    const question = await this.app.model.query(queryStr);
    return question
  }

  //获取问题
  async getQuestion(questionId){
    let queryStr = '';
    let queryStr2 = '';
    //如果传参里面有id，按照id查询问题
    if ('id' in questionId){
      // queryStr = `select * from questions where id = '${questionId}'`
      queryStr = `SELECT users.id, users.username, users.user_avatar, questions.title, questions.description, questions.createdAt,questions.updatedAt, questions.excerpt
      FROM users join questions 
      ON users.id = questions.creatorId 
      where users.id = '${questionId}' AND questions.creatorId = '${questionId}'`
    }else{
      queryStr = `SELECT users.id, users.username, users.user_avatar, questions.title, questions.description, questions.createdAt,questions.updatedAt, questions.excerpt 
        FROM users join questions ON users.id = questions.creatorId`
    }
    const question = await this.app.model.query(queryStr);
    question[0].forEach(item => {
      queryStr2 = `select count(1) from answers where targerId = '${item.id}'`
    })
    console.log(question);
    return question[0]
  }
}
module.exports = QuestionService;
