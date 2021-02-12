// Cube.js configuration options: https://cube.dev/docs/config process.env.CUBEJS_SCAN_DB_USER
const MSSqlDriver = require('@cubejs-backend/mssql-driver');

module.exports = {
  scheduledRefreshTimer: 10,
  dbType: ({ dataSource } = {}) => {
    if (dataSource === 'scans') {
      return 'mssql';
    } else {
      return 'mssql';
    }
  },
  driverFactory: ({ dataSource } = {}) => {
    if (dataSource === 'scans') {
      return new MSSqlDriver({
      server: 'localhost',
      database: 'opr_processed_log',
	    port: 1434,
      user: 'sa',
      password: 'Kirsty9079060',
      });
    } else {
      return new MSSqlDriver();
    }
  },
};