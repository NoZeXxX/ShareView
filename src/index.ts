import express from 'express'
import cors from 'cors'
import logger from 'morgan'

// routes
import streamRouter from './modules/stream/stream.controller.js'
import contentRouter from './modules/content/content.controller.js'

// middleware
const app = express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))

// endpoints
app.use('/stream', streamRouter)
app.use('/content', contentRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log('Начинаем стримить')
  console.log(`http://localhost:${PORT}`)
})
