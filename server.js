const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

app.get('/api/quotes/', (req, res, next) => {
    const author = req.query.person;
    if (!author) {
        res.send({quotes: quotes});
    } else {
        const quotesByAuthor = quotes.filter(obj => {
            return obj.person.toLowerCase().includes(author.toLowerCase());
        });
        res.send({quotes: quotesByAuthor});
    }
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = {quote: req.query.quote, person: req.query.person}
    if (!req.query.person || !req.query.quote) {
        res.status(400).send();
    } else {
        quotes.push(newQuote);
        res.send({quote: newQuote});
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
