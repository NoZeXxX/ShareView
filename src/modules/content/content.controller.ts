import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.sendFile('src/views/index.html', {
    root: '.'
  })
})

export default router
