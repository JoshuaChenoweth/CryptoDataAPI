

class Portfolio {
    constructor(){
        this.portfolio = [];
        this.add = [];
        this.history = [];
        this.value = "";
        this.remove = "";
    }

    calculateTotalPrice(price, quantity) {
        // Assuming a simple calculation for total price of said cryptocurrency
        return price * quantity;
    }

    buyCrypto(cryptoInfo, quantity) {
        // Calculate the total price based on the crypto price and quantity
        const totalPrice = this.calculateTotalPrice(cryptoInfo.price, quantity);

        // Add the bought cryptocurrency to the portfolio
        this.portfolio.push({
            id: cryptoInfo.id,
            name: cryptoInfo.name,
            symbol: cryptoInfo.symbol,
            quantity: quantity,
            totalPrice: totalPrice
        });

        // Update other portfolio details as needed
        this.value += totalPrice;
        this.history.push({ action: 'buy', crypto: cryptoInfo, quantity: quantity, totalPrice: totalPrice });
    }

    sellCrypto(cryptoID, quantity) {
        // Find the cryptocurrency in the portfolio based on the ID
        const cryptoInfo = this.portfolio.find(crypto => crypto.symbol === cryptoID);
    
        // Check if the cryptoInfo is found
        if (cryptoInfo) {
            // Calculate the total price based on the crypto price and quantity
            const totalPrice = this.calculateTotalPrice(cryptoInfo.price, quantity);
    
            // Update the portfolio by removing the sold cryptocurrency
            this.portfolio = this.portfolio.filter(crypto => crypto.id !== cryptoID);
    
            // Update other portfolio details as needed
            this.value -= totalPrice;
            this.history.push({ action: 'sell', crypto: cryptoInfo, quantity: quantity, totalPrice: totalPrice });
    
            return {
                message: `Successfully sold ${quantity} of ${cryptoInfo.name}.`,
                portfolio: this.portfolio
            };
        } else {
            return {
                error: 'Cryptocurrency not found in the portfolio.',
                portfolio: this.portfolio
            };
        }
    }

}

let portfolio = new Portfolio();
//creates a new portfolio object
exports.getPortfolio = function() {
    return (portfolio);
}
//returns the new portfolio
exports.addCrypto = function() {
    return cryptoData.cryptoCurrencies.push(cryptoData);
}