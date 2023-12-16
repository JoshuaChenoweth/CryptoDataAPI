

// Function to update the HTML table with the fetched data
function updateTableWithData(data) {
  const cryptoTable = document.getElementById('crypto-table');
  cryptoTable.innerHTML = '';

  // dynamically adds the header row to the newly created home page
  const headerRow = document.createElement('tr');
  const headers = ['Rank', 'Name', 'Symbol', 'price', 'percent_change_24hr', 'market_cap', 'total_supply', 'volume', 'volume_change_24h'];
  headers.forEach(function (header) {
    //designates a tag to the column headers and adds on onclick event listener
    const th = document.createElement('th');
    th.textContent = header;
    th.addEventListener('click', function () {
      sort(header.toLowerCase());
    });
    headerRow.appendChild(th);

  });
  //appends the header row to the home page
  cryptoTable.appendChild(headerRow);

  // populates the rows wih live crypto api data
  data.forEach(function (crypto) {
    const row = document.createElement('tr');

    // aligns the property names of the crpto api with the insertion labels
    const properties = ['rank', 'name', 'symbol', 'price', 'percent_change_24hr', 'marketCap', 'total_supply', 'volume', 'volume_change_24h'];
    //populates a single row in the table for each instance of a crypto currency
    //Also adds an event onclick listener for each row
    properties.forEach(function (property) {
      const cell = document.createElement('td');
      cell.textContent = crypto[property];
      row.appendChild(cell);
      row.addEventListener('click', function () {
        handleRowClick(crypto);
      });
    });


    cryptoTable.appendChild(row);
    //adds the row to the table
  });
}
// handles the event that a row is clicked
function handleRowClick(crypto) {
  console.log('Row clicked:', crypto.name);
  // gathers the element and display information for the modal window in home.html
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  //gathers the element tag of the row clicked
  var tableBody = document.getElementById('modalCryptoTable').getElementsByTagName('tbody')[0];
  for (var i = 1; i < tableBody.rows.length;) {
    tableBody.deleteRow(i);
  }
  // inserts a row into the modal window
  var row = tableBody.insertRow();
  // inserts actual cells into the row
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);
  var cell9 = row.insertCell(8);
  var cell10 = row.insertCell(9);
  var cell11 = row.insertCell(10);
  var cell12 = row.insertCell(11);
  // Populates the cells with live api info based on the id of the row clicked
  cell1.innerHTML = crypto.rank;
  cell2.innerHTML = crypto.name;
  cell3.innerHTML = crypto.symbol;
  cell4.innerHTML = crypto.price;
  cell5.innerHTML = crypto.percent_change_24hr;
  cell6.innerHTML = crypto.marketCap;
  cell7.innerHTML = crypto.total_supply;
  cell8.innerHTML = crypto.volume;
  cell9.innerHTML = crypto.volume_change_24h;
  cell10.innerHTML = crypto.date_added;
  cell11.innerHTML = crypto.num_market_pairs;
  cell12.innerHTML = crypto.infinite_supply;

  // Creates an event listener that corresponds to the by button in each modal window
  let button = document.getElementById('Buy');
  button.addEventListener('click', function () {
    // Gathers the real date and time of the currency bought
    let currentDate = new Date();
    let formattedDateAndTime = currentDate.toLocaleString();
    // Gathers the amount of currency the user bought
    let amount = document.getElementById('Quantity').value;
    // appends the currency to our portfolio
    if (amount) {
      buyCurrency(amount, crypto.symbol);
      showAlertOnce('You bought ' + amount + ' of ' + crypto.name + ' on ' + formattedDateAndTime);
    }
    // shows an alert the first time the user buys a currency, (without it the alert stays persistent)
  });
}

function showAlertOnce(message) {
  // Check if the alert has been shown
  let alertShown = sessionStorage.getItem('alertShown');

  if (!alertShown) {
    // Show the alert
    alert(message);

    // Set the flag to indicate that the alert has been shown
    sessionStorage.setItem('alertShown', 'true');
  }
}

window.onload = function () {
  var modal = document.getElementById('myModal');
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];
  span.onclick = function () {
    modal.style.display = "none";

    // Reset the alertShown flag when the modal is closed
    sessionStorage.removeItem('alertShown');
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

      // Reset the alertShown flag when the modal is closed
      sessionStorage.removeItem('alertShown');
    }
  }
}
// this function toggles the direction of which way a column is currently sorted, whether its asc or desc order
function sortDirection(asc, desc) {
  let state = asc;

  function toggle() {
    state = state === asc ? desc : asc;
    return state;
  }

  function getState() {
    return state;
  }

  return {
    toggle,
    getState,
  };


}


// Stores the state of the sort direction
const toggler = sortDirection('asc', 'desc');

// Function that sorts by specified column on click
function sort(column) {
  // Assuming toggler.toggle() returns the current sort direction
  const sortDirection = toggler.toggle();

  fetch('/api/cryptoData/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "sortField": column, "sortDirection": sortDirection })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      updateTableWithData(data);
    })
    .catch(function (error) {
      console.error('Error sorting crypto data:', error);
    });
}
// Function to populate modal content with retrieved details

function handleLogout () {
  req.session.destroy();
  window.location.href = "/home"; 
  var logoutButton =  document.getElementById('Logout');
  if (logoutButton) {
  logoutButton.addEventListener('click', handleLogout);
  }
}
// fethches the api crypto data
fetch('/api/cryptoData/')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    updateTableWithData(data);
  })
  .catch(function (error) {
    console.error('Error fetching crypto data:', error);
  });
// fethes the patch function for buying crypto currencies
function buyCurrency(amount, symbol) {
  fetch(`/api/portfolio/buy/${symbol}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "quantity": amount })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return handleRowClick(data);
  })
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Home").addEventListener("click", function () { window.location.href = "/home" })
  const portfolio = document.getElementById("Portfolio")
  if (portfolio !== null) {
    portfolio.addEventListener("click", function () { window.location.href = "/portfolio" })
  }
  const yourAccount = document.getElementById("YourAccount")
  if (yourAccount !== null) {
    yourAccount.addEventListener("click", function () { window.location.href = "/account" })
  }

  const logout = document.getElementById("Logout")
  if (logout !== null) {
    logout.addEventListener("click", function () { window.location.href = "/login" })
  }

  const login = document.getElementById("Login")
  if (login !== null) {
    login.addEventListener("click", function () { window.location.href = "/login" })
  }

  const register = document.getElementById("Register")
  if (register !== null) {
    register.addEventListener("click", function () { window.location.href = "/register" })
  }
// These functions above give routing functionality to the login, logout, register, yourAccount, and portfolio button. More in depth functionality lies within crypto.js



})
// sets the timer interval and calls the the update table with data function
updateTableWithData();
setInterval(updateTableWithData, 10);




