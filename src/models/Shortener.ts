import mongoose from "mongoose";

import { ShortenerSchema } from "../schemas";

const Shortener = mongoose.model('shortener', ShortenerSchema);

export default Shortener;