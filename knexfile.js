'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/users_db'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/users_db'
  },

  production: {}
};
