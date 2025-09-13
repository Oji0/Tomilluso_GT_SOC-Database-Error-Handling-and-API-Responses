import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Loads environment variables from .env file

// Create a connection pool
const pool = mysql.createPool({
    host: localhost,
    user: root,
    password: admin,
    database: blogdatabase,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// A simple function to test the connection
export const testConnection = async () => {
    try {
        await pool.getConnection();
        console.log('Successfully connected to the MySQL database.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default pool;