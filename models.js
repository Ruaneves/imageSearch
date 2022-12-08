const mongoose = require('mongoose');

const Search = mongoose.model('searches', {
    search_query: String,
    page: Number,
    time_searched: Date
})

module.exports = {
    Search: Search
}