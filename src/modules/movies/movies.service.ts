import * as cheerio from 'cheerio'
import axios from 'axios'
import { parse } from 'qs'
import { BASE_SEARCH_URL } from './movies.const'
import { extractMagnetFromQuery } from './movies.util'




export const movieSearch = async (searchTerm: string) => {
    const searchResult = await axios.get(`${BASE_SEARCH_URL}/${searchTerm}`)
    const $ = cheerio.load(searchResult.data)

    const data = $('.results dl').toArray()

    return data.map(item => {
        const [title, magnetTag] = $(item).find('a').toArray()
        const magnetLink = $(magnetTag).attr('href');


        return {
            magnet: extractMagnetFromQuery(magnetLink),
            title: $(title).text(),
            torrentUrl: $(title).attr('href')
        }
    })
    .filter(item => item.title)
}