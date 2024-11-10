import { Router } from 'express'
import WebTorrent from 'webtorrent'

const router = Router()
const client = new WebTorrent()

router.get('/', (req, res) => {
  res.status(200).send({
    hello: 'World'
  })
})

export default router
