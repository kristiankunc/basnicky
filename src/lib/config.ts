import { MASTER_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } from "$env/static/private";

export const masterPassword = MASTER_PASSWORD;

export const mysqlConfig = {
	host: MYSQL_HOST,
	port: MYSQL_PORT,
	username: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: MYSQL_DB
};
