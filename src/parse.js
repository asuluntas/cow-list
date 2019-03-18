var Parse = {

  server:'http://localhost:4568/api/cows',

  create: function(cow, successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(cow),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function (error) {
        console.error('cows: Failed to create cow', error);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('cows: Failed to fetch cows', error);
      }
    });
  }
};

export default Parse;