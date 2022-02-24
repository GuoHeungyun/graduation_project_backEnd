const Service = require('egg').Service;

class LoginService extends Service {
  async findUser(data){
    let queryStr = '';
    if (data.username.length === 0){
      //登录
      queryStr = `select * from users where phone = ${data.phone} and password = '${data.password}'`
    }else {
      //找回密码
      queryStr = `select * from users where phone = ${data.phone} and username = '${data.username}'`
    }
    const user = await this.app.model.query(queryStr);
    return {
      user
    };
  }

  async insertUser(param){
    const user = await this.app.model.query(
      `insert into users (phone, password, username) values (${param.phone},'${param.password}','${param.username}')`
    );
    return user
  }

  async updateUsername(userdata){
    const result = await this.app.model.query(
      `update users set username = '${userdata.username}' where phone = '${userdata.phone}'`
    );
    return result
  }

  async updatePhone(userdata){
    const result = await this.app.model.query(
      `update users set phone = '${userdata.newPhone}' where phone = '${userdata.oldPhone}'`
    )
    return result
  }

  async updatePassword(userdata){
    const result = await this.app.model.query(
      `update users set password = '${userdata.password}' where phone = '${userdata.phone}'`
    )
    return result
  }

  async updateIntroduction(userdata){
    const result = await this.app.model.query(
      `update users set introduction = '${userdata.introduction}' where phone = '${userdata.phone}'`
    )
    return result
  }
}
module.exports = LoginService;
