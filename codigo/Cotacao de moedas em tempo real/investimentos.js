
$(document).ready(function() {
  // Array with cryptocurrency symbols
  var symbols = ['bitcoin', 'ethereum'];

  // Function to format the price with two decimal places
  function formatPrice(price) {
    return '$' + price.toFixed(2);
  }

  // Function to update the values in the table
  function updateTable() {
    symbols.forEach(function(symbol) {
      // Make an AJAX request to get cryptocurrency data
      $.ajax({
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=usd&include_24hr_change=true',
        method: 'GET',
        success: function(data) {
          // Get the price and change values
          var price = data[symbol].usd;
          var change = data[symbol].usd_24h_change;

          // Update the values in the table
          $('#' + symbol + '-price').text(formatPrice(price));
          $('#' + symbol + '-change').text(change.toFixed(2) + '%');

          // Add the 'positive' or 'negative' class depending on the change value
          if (change > 0) {
            $('#' + symbol + '-change').addClass('positive').removeClass('negative');
          } else {
            $('#' + symbol + '-change').addClass('negative').removeClass('positive');
          }
        },
        error: function() {
          console.log('Error retrieving cryptocurrency data for ' + symbol);
        }
      });
    });
  }

  // Call the table update function initially
  updateTable();

  // Update the table every 5 seconds
  setInterval(updateTable, 5000);
});