const mongoose = require('mongoose')

const monsterSchema = new mongoose.Schema ({
    Name: String,
    Appearance: String,
    Culture: String,
    Symbolism: String,
    Abilities: String,
    Origin: String,
})

const Monster = mongoose.model("Monster", monsterSchema)

module.exports = Monster