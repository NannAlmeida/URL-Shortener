import { Router } from "express";

import shortenerRoute from './shortener';
import { ShortenerController } from "../controllers";

const route: Router = Router();

route.use('/short', shortenerRoute);

route.get('/:code', ShortenerController.redirectUrl);

export default route;