import { Router } from "express";

import { ShortenerController } from "../controllers";

const route: Router = Router();

route.post('/', ShortenerController.shortUrl);
route.get('/:code', ShortenerController.getFullUrl);

export default route;