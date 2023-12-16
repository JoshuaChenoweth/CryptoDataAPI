class CryptoData {
    constructor() {
        this.cryptoCurrencies = [];
        this.sort = "";
        this.sortDirection = "asc";
        this.searchResults = [];
        this.searchQuery = "";
        this.currentCrypto = "";
        this.value = "";
    }
}
//Parameter constructors for all the information pertaining to my cryptodata manipulation


let cryptoData = new CryptoData();
//Creates a new crypto data object
exports.getCryptoData = function () {
    return (cryptoData);
}
//Exports specified cryptoobject


exports.addCrypto = function () {
    return cryptoData.cryptoCurrencies.push(cryptoData);
}
exports.sortCurrencies = function () {
    const { sort, sortDirection } = cryptoData;
    // Conducting the sort
    if (sort && sortDirection) {
        cryptoData.cryptoCurrencies.sort((a, b) => {
            // changes the symbol to upper case for the sort to be consistent
            const symbolA = a.symbol.toUpperCase();
            const symbolB = b.symbol.toUpperCase();
            if (sortDirection === 'asc') {
                return symbolA.localeCompare(symbolB);
            } else if (sortDirection === 'desc') {
                return symbolB.localeCompare(symbolA);
            } else return 0;
        })
    }
}

//Above is the method called by cryptoController to sort my cryptocurrencies
exports.setSearchCriteria = function (searchQuery) {
    cryptoData.searchQuery = searchQuery;
};
//Exports the criteria made for my search functionality
exports.searchCurrencies = function () {
    const { cryptoCurrencies, searchQuery } = cryptoData;
    //Grabs the cryptocurrency list as well as our designated search query.
    if (searchQuery) {
        cryptoData.searchResults = cryptoCurrencies.filter(crypto =>
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );
        //Searches our crypto list
    }
};

const axios = require('axios');
const currency = require('../models/Detail');
let response = null;
new Promise(async (resolve, reject) => {
    try {
        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': '5eb37855-bb95-4569-8e7f-a2f073db353a',
            },
        });
        // populates the crypto table with live and scraped crypto information.
    } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
    }
    if (response) {
        // success
        const json = response.data;
        console.log(json);
        resolve(json);
        rawData = json.data;
        cryptoData.cryptoCurrencies = [];
        for (const c of json.data) {
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
            obj.date_added= c.date_added;
            obj.num_market_pairs = c.num_market_pairs;
            obj.infinite_supply = c.infinite_supply;
            cryptoData.cryptoCurrencies.push(obj);
        }
    }
});