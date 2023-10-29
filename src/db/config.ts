import { Dialect, Sequelize } from 'sequelize';

const dbHost = '127.0.0.1'
const dbPort = 5432
const dbName = 'mydb'
const dbUser = 'myusername'

const dbDriver = 'postgres'
const dbPassword = 'mypassword';

function getConnection() {
       return new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        port: dbPort ,
        dialect: 'postgres',
      });
}

const sequelizeConnection = getConnection()


export default sequelizeConnection;