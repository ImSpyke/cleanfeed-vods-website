import dotenv from 'dotenv'
dotenv.config()
export default {
    "port": 8080,
    "admin_password": process.env.ADMIN_PASSWORD
}