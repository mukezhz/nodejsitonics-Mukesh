import * as express from "express"
import * as controller from "./controller"

export const router = express.Router()

// for getting original url form shorterned url 
router.get("/:key", controller.getOriginalURL)

// for shorteing the url
router.post("/shorten", controller.shortener)