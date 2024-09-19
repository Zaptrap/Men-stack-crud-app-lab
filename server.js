const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const methodOverride = require("method-override");
const morgan = require("morgan");
const Monster = require('./models/monsters');

dotenv.config()
console.log("Connection string", process.env.MONGODB_URI)

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("error", (err) => {
    console.log(err)
})

app.set('view engine', 'ejs')

app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

app.use(express.urlencoded({ extended: false }));

app.get('/monsters', (req, res) => {
    res.send('/homepage')
})

// GET - Display All
app.get('/monsters/catalog', (req, res) => {
    res.render('monsters/catalog')
})

// GET - Show form to create a new
app.get('/monsters/new', async (req, res) => {
    res.render('monsters/new')
})

// POST - Create a new
app.post('/monsters', async (req, res) => {
    console.log(req.body)

    try {
        const createMonster = await Monster.create(req.body)
        res.redirect('/monsters/new?status=success')
        console.log('New Monster has been added', createMonster)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

// GET - Display specific Data via ID
app.get('/monsters/:id', async (req, res) => {
    try {
        const locateMonsterData = await Monster.findById(req.params.id)
        const monsterInfo = {monster: locateMonsterData}
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

// GET - Show form to edit existing data
app.get('/monsters/:id/edit', async (req, res) => {
    try {
        const editThisMonster = await Monster.findById(req.params.id)
        res.render('/monsters/edit')
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

// PUT - Update exist data based on ID
app.put('/monsters/:id', async (req, res) => {
    try {
        await Monster.findByIdAndUpdate9(req.params.id, req.body, {new: TextTrackCueList})
        res.redirect(`/monsters/${req.params.id}`)
    } catch(err){
        console.log(err)
        res.redirect(`/monsters/${req.params.id}`)
    }
})

// DELETE - Destroy existing data via targeting ID
app.delete('/monsters/:id', async (req, res) => {
    try {
        await Monster.findByIdAndDelete(req.params.id)
        res.redirect('/monsterslcatalog')
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

app.listen(3000, ()=> {
    console.log("Listening on port 3000")
})