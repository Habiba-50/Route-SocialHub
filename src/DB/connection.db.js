import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './../../config/config.service.js';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  port: DB_PORT,
  host: DB_HOST,
  dialect: "mysql",
});

export const checkDBconnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("DB connected");
        
    } catch (error) {
        console.log('Fail to connect to DB');
        
    }
}
export const checkSYNCconnection = async () => {
    try {
        await sequelize.sync({alter:false , force:false})
        console.log("DB connected");
        
    } catch (error) {
        console.log('Fail to connect to DB');
        
    }
}
