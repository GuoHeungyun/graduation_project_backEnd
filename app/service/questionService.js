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
    let queryStr = '';  //第一句sql
    let queryStr2 = ''; //第二句sql
    let questionList = [];  //问题列表
    let question;     //所有问题,要把里面的item插入到questionList中

    //如果传参里面有id，按照id查询问题(暂时弃用)
    if (Object.getOwnPropertyNames(questionId).length){
      queryStr = `
          SELECT users.user_id,
                 users.username,
                 users.user_avatar,
                 questions.question_id,
                 questions.title,
                 questions.description,
                 questions.createdAt,
                 questions.updatedAt,
                 questions.excerpt
          FROM users
                   JOIN questions ON users.user_id = questions.creatorId
            AND questions.question_id = '${questionId.id}'`
    }else{    //否则查询全部问题
      queryStr = `SELECT users.user_id, users.username, users.user_avatar, questions.question_id, questions.title, questions.description, questions.createdAt,questions.updatedAt, questions.excerpt 
        FROM users join questions ON users.user_id = questions.creatorId`
    }
    question = await this.app.model.query(queryStr);  //问题集合
    //每个问题添加回答数
    return new Promise((resolve, reject) =>{
      for(let i = 0; i< question[0].length; i++){
        queryStr2 = `select count(1) AS number from answers where targetId = '${question[0][i].question_id}'`
        new Promise((resolve, reject) =>{
          resolve(this.app.model.query(queryStr2))
        }).then(data => {
          question[0][i].answerNumber = data[0][0].number
          questionList.push(question[0][i]);
          if (i+1 === question[0].length){
            resolve(questionList)
          }
        })
      }
    }).then(data => {
      data.reverse();
      return data
    })
  }
}
module.exports = QuestionService;
