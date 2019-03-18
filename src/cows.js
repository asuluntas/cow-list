var Cows = {
  _data: {},

  items: function() {
    return Object.values(Cows._data);
  },

  // add: function(message, callback = ()=>{}) {
  //   Messages._data[message.objectId] = message;
  //   callback(Messages.items());
  // },

  update: function(cows, callback = ()=>{}) {
    var length = Object.keys(Cows._data).length;
    for (let cow of cows) {
      Cows._data[cow.name] = Cows._conform(cow);
    }
    // only invoke the callback if something changed
    if (Object.keys(Cows._data).length !== length) {
      callback(Cows.items());
    }
  },

  _conform: function(cow) {
    // ensure each cow object conforms to expected shape
    cow.name = cow.name || '';
    cow.description = cow.description || '';
    return cow;
  }

};

export default Cows;