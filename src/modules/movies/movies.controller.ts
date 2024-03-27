import { Router } from 'express'
import * as cheerio from 'cheerio'
import axios from 'axios'
import { SearchRequest } from './movies.interfaces'
import { contents } from 'cheerio/lib/api/traversing'


const router = Router()

const BASE_SEARCH_URL = 'https://torrentz2.nz/search?q='

router.get('/search', async ({ query: { searchTerm } }: SearchRequest, res) => {
    try {
        const searchResult = await axios.get(`${BASE_SEARCH_URL}${searchTerm}`)
        const $ = cheerio.load(searchResult.data)

        const data = $('.results dl').toArray()

        const results = data.map(item => {
            const [title, magnetTag] = $(item).find('a').toArray()
            const magnetLink = $(magnetTag).attr('href')



            return ({
                magnet: magnetLink,
                title: $(title).text()
            })
        })
        res.status(200).send(results)//searchResult.data)
    } catch (err) {
        res.status(400).send(err)
    }

})

export default router