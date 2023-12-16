document.addEventListener('DOMContentLoaded', function () {
    const portfolioContent = document.getElementById('portfolioContent');

    // Fetch portfolio data and populate the table
    fetch('/api/Portfolio')
        .then(function (response) {
            return response.json();
        })
        .then(function (portfolioData) {
            const portfolioTable = createPortfolioTable(portfolioData);
            portfolioContent.appendChild(portfolioTable);
        })
        .catch(function (error) {
            console.error('Error fetching portfolio data:', error);
        });

    // Function to create and populate the portfolio table
    function createPortfolioTable(dataArray) {
        const portfolioTable = document.createElement('table');
        portfolioTable.id = 'Portfolio-Table';
        portfolioTable.classList.add('Portfolio-Table');
        // populates header rows
        const headerRow = document.createElement('tr');
        const headers = [
            'Rank',
            'Name',
            'Symbol',
            'Price (USD)',
            '24hr Change (%)',
            'Market Cap (USD)',
            'Supply',
            'Volume (24hr)',
            'VWA Price (24hr)',
            'Date Added',
            'Num Market Pairs',
            'Infinite Supply'
        ];

        headers.forEach(function (header) {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        portfolioTable.appendChild(headerRow);
        // populates table for each item added to the portfolio
        dataArray.forEach(function (crypto) {
            const row = document.createElement('tr');

            const properties = [
                'rank',
                'name',
                'symbol',
                'price',
                'percent_change_24hr',
                'marketCap',
                'total_supply',
                'volume',
                'volume_change_24h',
                'date_added',
                'num_market_pairs',
                'infinite_supply'
            ];

            properties.forEach(function (property) {
                const cell = document.createElement('td');
                cell.textContent = crypto[property];
                row.appendChild(cell);
            });

            portfolioTable.appendChild(row);
        });

        return portfolioTable;
    }
});

// I couldnt get the population functionality to work for portfolio sadly, for neatness purposes it is still hardcoded
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr));
})));
/*uses a comparative algorithm to sort each of the column headers from ascending or descending order depending
upon the header of your choice*/