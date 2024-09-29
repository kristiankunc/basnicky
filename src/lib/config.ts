import dotenv from "dotenv";

dotenv.config();


export const masterPassword = process.env.MASTER_PASSWORD;

export const mysqlConfig = {
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
};
