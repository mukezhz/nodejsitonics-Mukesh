import * as dotenv from "dotenv"
dotenv.config()
import * as express from "express"
import * as winston from "winston"
import { AppDataSource } from "./data-source"
import { router } from "./routes"

const PORT = process.env["PORT"] || 3000

const { combine, timestamp, prettyPrint } = winston.format
export const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const app = express()
app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});
// for body to be automatically parse as json
app.use(express.json())
// config urlencode like rate limit
app.use(express.urlencoded({ extended: true, limit: "100mb" }))
// adding prefix to tthe url
app.use("/api", router)

AppDataSource.initialize().then(async () => {
    console.log("Connected to database...")

}).catch(error => console.log(error))


app.listen(Number(PORT), () => {
    console.log(`Listenin in port ${PORT}!!!`);
})