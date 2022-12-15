const express = require('express')
const author = require('../models/author')
const router = express.Router()

const Author = require('../models/author')

router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors : authors,
            searchOptions : req.query
        })
    } catch (error) {
        res.redirect('/')
    }
}) //All


router.get('/new',(req,res) => {
    res.render('authors/new',{ author: new author() })
}) //New


router.post('/', async (req,res) => {
    const author = new Author({
        name : req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect(`authors`)
    } catch (error) {
        res.render('authors/new',{
            author : author,
            errorMessage: 'Error Creating Author'
        })
    }
}) //Create

module.exports = router