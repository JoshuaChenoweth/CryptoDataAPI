var Detail = require('../models/Detail.js');

exports.getDetail = function (req, res) {
    Detail.CryptoCurrency[10] = name[req.params.id], rank[req.params.id], symbol[req.params.id], price[req.params.id], change[req.params.id]
    marketCap[req.params.id], supply[req.params.id], volume[req.params.id], vwap[req.params.id], priceHistory[req.params.id];
    res.setHeader('Content - Type ', 'text / plain ');
    res.send(detail.CryptoCurrency[10].getDetail());
}

exports.getPriceHistory = function (req, res) {
    Detail.CryptoCurrency = priceHistory[req.params.id];
    res.setHeader('Content - Type ', 'text / plain ');
    res.send(Detail.CryptoCurrency.getPriceHistory())
}

exports.getPriceAtTime = function (req, res) {
    Detail.CryptoCurrency = price[req.params.id];
    res.setHeader('Content - Type ', 'text / plain ');
    res.send(Detail.CryptoCurrency.getPriceAtTime());
}

//ALl of these are the framework structures for the detail routing.