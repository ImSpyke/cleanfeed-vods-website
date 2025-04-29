import dotenv from 'dotenv'
dotenv.config()
export default {
    "port": 3000,
    "admin_password": process.env.ADMIN_PASSWORD
}