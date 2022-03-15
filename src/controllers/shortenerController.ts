import { Request, Response } from "express";

import { ShortenerModel } from "../models";
import { makeRandomString } from "../utils";

class ShortenerController {
    async shortUrl(request: Request, response: Response): Promise<Response> {
        const url: string = request.body.url;
        const visits: number = 0;
        const code: string = makeRandomString();

        const shortener = await ShortenerModel.create({ url, code, visits });
        
        return response.status(201).json({ status: 'success', message: 'Link generated!', link: `${process.env.APP_URL}/${shortener.code}` });
    }

    async getFullUrl(request: Request, response: Response): Promise<Response> {
        const code: string = request.params.code;

        const findUrl = await ShortenerModel.findOne({ code });

        return response.json({ status: 'success', url: findUrl.url, visits: findUrl.visits });
    }

    async redirectUrl(request: Request, response: Response): Promise<void> {
        const code: string = request.params.code;

        const findOriginalUrl = await ShortenerModel.findOne({ code });
        findOriginalUrl.visits = findOriginalUrl.visits + 1;
        
        await ShortenerModel.updateOne({ code }, { visits: findOriginalUrl.visits });
        
        response.redirect(findOriginalUrl.url);
    }
}

export default new ShortenerController();