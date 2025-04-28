import express, { Request, Response } from 'express'
const app = express()

import { fileURLToPath } from 'url';
import path from 'path';


import CONFIG from './config.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ROOT = path.resolve(__dirname, '../public/')

console.log(SITE_ROOT)

app.get('/', (_req: Request, res: Response) => {
    res.sendFile(SITE_ROOT + '/index.html')
})

app.listen(CONFIG.port, () => {
  console.log(`[SpykeVOD] Listening on port ${CONFIG.port}`)
})
