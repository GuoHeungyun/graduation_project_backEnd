/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640682724801_1880';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'graduation',
  };

  // add cors config here
  config.cors = {
    origin: 'http://localhost:8088', // 访问白名单,根据你自己的需要进行设置
    credentials: true,  //允许Cook可以跨域,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  return {
    ...config,
    ...userConfig
  };
};
