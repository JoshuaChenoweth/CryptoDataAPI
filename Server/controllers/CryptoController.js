const crypto = require('../models/CryptoData');
const data = require('../crypto_example.json');

exports.populateData = function () {
    for (const c of data.data) {
        let obj = {};
        obj.name = c.name;
        obj.symbol = c.symbol;
        obj.id = c.id;
        obj.rank = c.cmc_rank;
        obj.price = c.quote.USD.price;
        obj.percent_change_24hr = c.quote.USD.percent_change_24h;
        obj.marketCap = c.quote.USD.market_cap;
        obj.total_supply = c.total_supply;
        obj.volume = c.quote.USD.volume_24h;
        obj.volume_change_24h = c.quote.USD.volume_change_24h;
        obj.date_added = c.date_added;
        obj.num_market_pairs = c.num_market_pairs;
        obj.infinite_supply = c.infinite_supply;
        crypto.getCryptoData().cryptoCurrencies.push(obj);
    }
    console.log(crypto.getCryptoData().cryptoCurrencies);
}

//This function above populates our object that is cryptodata.
exports.getCryptoData = function (req, res) {
    var currency = crypto.getCryptoData().cryptoCurrencies;
    res.send(currency.slice(0,50));
}
//Allows the user to access all the crypto data available within our json file.
exports.getCryptoDataByID = function(req, res) {
    var cryptoID = crypto.getCryptoData().cryptoCurrencies.find(e => e.symbol == req.params.id);
    res.send(cryptoID);
}
//Allows the user to access specific crypto data based off of its ID.
exports.sortCurrencies = function(req, res) {
    const data = req.body;
    var field = data.sortField;
    var direction = data.sortDirection;
    //Gathers the data within crypto, then sets field and direction equal to the users specification of ascending/descending, and what crypto property they would like to sort
    crypto.getCryptoData().sort = field;
    crypto.getCryptoData().sortDirection = direction;
    //Gathers the field and the direction
    if (direction === 'asc') {
        crypto.getCryptoData().cryptoCurrencies.sort(function(a,b) {
            if (a[field] > b[field]) 
                return 1;
            if (a[field] < b[field])
                return -1;
            else return 0;
        });
    } else if (direction === 'desc') {
        crypto.getCryptoData().cryptoCurrencies.sort(function(a,b) {
            if (b[field] > a[field]) 
                return 1;
            if (b[field] < a[field])
                return -1;
            else return 0;
        });
    }
    //Above is the sorting algorithm that organzises the data received from the get function.

    res.setHeader('Content-Type', 'text/plain');
    res.send(crypto.getCryptoData().cryptoCurrencies);
    //Sets text type to plain and sends the result of the sort.
}

exports.searchCurrencies = function (req, res) {
    const { searchQuery } = req.body;
    //Requests the parameters from cryptodata.js surrounding searchQuery.
    crypto.setSearchCriteria(searchQuery);
    crypto.searchCurrencies();
    //Searches currencies based off of the provided search query.
    res.json({
        message: "Search criteria set successfully.",
        searchResults: crypto.getCryptoData().searchResults
    });
    //returns the requested cryptodata as well as a confirmation message
}

exports.viewDetail = function (req, res) {
    crypto.CryptoData = cryptoCurrencies[req.params.id];
    res.setHeader('Content - Type ', 'text / plain ');
    res.send(crypto.CryptoData.viewDetail());
}
//Framework for viewing the details of specific currencies.