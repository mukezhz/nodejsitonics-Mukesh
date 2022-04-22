import * as express from "express"
import * as nanoid from "nanoid"
import * as yup from 'yup';
import { Url } from "../entity/Url";
import { logger } from "../index"

type body = { originalURL: string }
type param = { key: string }

let schema = yup.object().shape({
    url: yup.string().url(),
});

export const shortener = async (req: express.Request, res: express.Response) => {
    try {
        // obtained from the form
        const { originalURL } = req.body as body
        if (!(await schema.isValid({ url: originalURL, }))) {
            logger.log({
                level: 'error',
                message: "Invalid URL!!!"
            });
            return res.status(400).json({ message: "Invalid URL!!!" })
        }
        const url = new Url()
        const shorten = nanoid.customAlphabet("qwertyuiopasdfghjklzxcvbnm1234567890", 6)()
        url.shortenURL = shorten
        url.originalURL = originalURL
        await url.save()
        return res.json({ shorten })
    } catch (error) {
        logger.log({
            level: 'error',
            message: error
        });
        return res.status(400).json({ error })
    }
}


export const getOriginalURL = async (req: express.Request, res: express.Response) => {
    try {
        const { key } = req.params as param
        // find key in database
        const url = await Url.findOneBy({ shortenURL: key })
        if (!url) {
            logger.log({
                level: 'error',
                message: "url doesn't exits!!!"
            });
            return res.status(404).json({ message: "url doesn't exits!!!" })
        }
        res.status(200).json({ originalURL: url.originalURL })
    } catch (error) {
        logger.log({
            level: 'error',
            message: error,
        });
        res.status(400).json({ error })
    }
}
