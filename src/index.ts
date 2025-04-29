import express, { Request, Response } from 'express'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

import { fileURLToPath } from 'url';
import path from 'path';


import CONFIG from './config.js'


import { sha1 } from 'js-sha1';
import fs from 'fs';
// Add declaration for sha1


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ROOT = path.resolve(__dirname, '../public/')

console.log(SITE_ROOT)

// app.use display every request method and ul
app.use((req, _res, next) => {
    console.log(`[Server] ${req.method} ${req.url}`)
    next()
})


let VODS: any = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../vods.json'), 'utf-8'))



function writeVODS() {
    fs.writeFileSync(path.resolve(__dirname, '../vods.json'), JSON.stringify(VODS,null,2))
}
function addVOD(vod: any) {
    vod.hash = sha1(`${vod.number}${vod.game}${vod.url}`)
    VODS.push(vod)
    writeVODS()
}

console.log(`VODS:`, VODS)



app.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(SITE_ROOT + '/index.html'))
    return;
})
app.get('/add', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(SITE_ROOT + '/add.html'))
    return;
})

app.get('/assets/*splat', (_req: Request, res: Response) => {
    const filePath = path.resolve(SITE_ROOT + _req.url)
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath)
        return;
    } else {
        res.send({ message: 'File not found' })
        return;
    }
})


app.get('/api/vods', (_req: Request, res: Response) => {

    res.send(VODS)
})

app.post('/api/add', (req: Request, res: Response) => {
    const data = req.body;
    console.log("data:", data)
    console.log("data.password", data.password)
    console.log("admin_password", CONFIG.admin_password)
    if(!data || data.password !== CONFIG.admin_password) {
        res.status(401).send({ message: '401 Unauthorized' })
        return;
    }
    addVOD(data)
    res.send({ message: 'VOD added successfully' })
})

app.listen(CONFIG.port, () => {
  console.log(`[SpykeVOD] Listening on port ${CONFIG.port}`)
})
