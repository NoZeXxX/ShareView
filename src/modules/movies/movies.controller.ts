import { Router } from 'express'
import * as cheerio from 'cheerio'
import axios from 'axios'
import { SearchRequest } from './movies.interfaces'
import { parse } from 'qs'
// import { contents } from 'cheerio/lib/api/traversing'


const router = Router()

const BASE_SEARCH_URL = 'https://torrentz2.nz/search?q=';
const MAGNET_KEY = 'magnet:?xt';
const SPLIT_MAGNET_STRING = 'urn:btih:'

router.get('/search', async ({ query: { searchTerm } }: SearchRequest, res) => {
    try {
        const searchResult = await axios.get(`${BASE_SEARCH_URL}/${searchTerm}`)
        const $ = cheerio.load(searchResult.data)

        const data = $('.results dl').toArray()

        const results = data.map(item => {
            const [title, magnetTag] = $(item).find('a').toArray()
            const magnetLink = $(magnetTag).attr('href');
            const parsedMagnetLink = parse(magnetLink)
            const magnet = String(parsedMagnetLink[MAGNET_KEY]).replace(SPLIT_MAGNET_STRING, '');

            return {
                magnet,
                title: $(title).text(),
                torrentUrl: $(title).attr('href')
            }
        })
        .filter(item => item.title)
        res.status(200).send(results)
    } catch (err) {
        res.status(400).send(err)
    }

})

export default router