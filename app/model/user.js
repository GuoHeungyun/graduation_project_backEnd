module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const user = app.model.define('users', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    phone: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    username: {
      type: STRING,
      allowNull: false
    },
    introduction: {
      type: STRING,
      allowNull: true
    },
    user_avatar: {
      type: INTEGER,
      allowNull: true
    },
    createdAt:DATE,
    updatedAt:DATE
  });
  return user;
}
