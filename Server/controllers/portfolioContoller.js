const investments = require('../models/Portfolio');
const crypto = require('../models/CryptoData');


exports.buyCrypto = function (req, res) {
    const portfolio = investments.getPortfolio();
    const cryptoSymbol = req.body.symbol; 
    const quantity = req.body.quantity; 
    //Accepts user provided symbol as well as quantity
    const cryptoInfo = crypto.getCryptoData().cryptoCurrencies.find(crypto => crypto.symbol === cryptoSymbol);
    //Gathers the cryptoinformation from cryptodata
    if (cryptoInfo) {
        investments.getPortfolio().buyCrypto(cryptoInfo, quantity)

        res.json({
            message: `Successfully bought ${quantity} of ${cryptoInfo.name}.`,
            investments: portfolio
        });
    } else {
        res.status(404).json({ message: 'Cryptocurrency not found.' });
    }
    //Shows the user a confirmation message if the transaction goes through, and an error message if it doesn't
};
//Uses the raw body request option in postman, allows you to specify a symbol and a quantity of crypto you wish to buy that adds that specified number of crytocurrencies to your portfolio

exports.sellCrypto = function (req, res) {
    const portfolio = investments.getPortfolio();
    const cryptoSymbol = req.params.id;
    const quantity = req.body.quantity;
    //Accepts user provided id for the crypto as well as the quantity they wish to remove
    const result = portfolio.sellCrypto(cryptoSymbol, quantity);

    if (result.error) {
        res.status(404).json({ message: result.error });
    } else {
        res.json({
            message: result.message,
            investments: result.portfolio
        });
    }
    //Either outputs the results or an error message depending upon whether or not the crypto was located within the portfolio.
};
//Accesse the portfolio full of currencies that we added with the buyCrypto function. Then selects a specific index within the portfolio and removes it.

exports.getPortfolio = function(req, res) {
    res.send(investments.getPortfolio());
}

exports.getPortfolioValue = function (req, res) {
    investments.Portfolio = value[req.params.id];
    res.setHeader('Content - Type ', 'text / plain ');
    res.send(investments.Portfolio.getPortfolioValue());
}
//Framework for the portfolio value

exports.getPortfolioValueHistory = function (req, res) {
    investments.Portfolio[2] = value[req.params.id], history[req.params.id];
    res.setHeader('Content - Type ', 'text / plain ');
    res.send(investments.Portfolio.getPortfolioValueHistory());
}
//framework for the portfolio value history