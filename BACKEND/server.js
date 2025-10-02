const app = require('./src/app');
const dotenv = require('dotenv')
const connectDB = require('./src/db/db')

dotenv.config()
connectDB()

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});