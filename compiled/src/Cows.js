var Cows = {
  _data: {},

  items: function () {
    return Object.values(Cows._data);
  },

  // add: function(message, callback = ()=>{}) {
  //   Messages._data[message.objectId] = message;
  //   callback(Messages.items());
  // },

  update: function (cows, callback = () => {}) {
    var length = Object.keys(Cows._data).length;
    for (let cow of cows) {
      Cows._data[cow.name] = Cows._conform(cow);
    }
    // only invoke the callback if something changed
    if (Object.keys(Cows._data).length !== length) {
      callback(Cows.items());
    }
  },

  _conform: function (cow) {
    // ensure each cow object conforms to expected shape
    cow.name = cow.name || '';
    cow.description = cow.description || '';
    return cow;
  }

};

export default Cows;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3dzLmpzIl0sIm5hbWVzIjpbIkNvd3MiLCJfZGF0YSIsIml0ZW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidXBkYXRlIiwiY293cyIsImNhbGxiYWNrIiwibGVuZ3RoIiwia2V5cyIsImNvdyIsIm5hbWUiLCJfY29uZm9ybSIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxPQUFPO0FBQ1RDLFNBQU8sRUFERTs7QUFHVEMsU0FBTyxZQUFXO0FBQ2hCLFdBQU9DLE9BQU9DLE1BQVAsQ0FBY0osS0FBS0MsS0FBbkIsQ0FBUDtBQUNELEdBTFE7O0FBT1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUFJLFVBQVEsVUFBU0MsSUFBVCxFQUFlQyxXQUFXLE1BQUksQ0FBRSxDQUFoQyxFQUFrQztBQUN4QyxRQUFJQyxTQUFTTCxPQUFPTSxJQUFQLENBQVlULEtBQUtDLEtBQWpCLEVBQXdCTyxNQUFyQztBQUNBLFNBQUssSUFBSUUsR0FBVCxJQUFnQkosSUFBaEIsRUFBc0I7QUFDcEJOLFdBQUtDLEtBQUwsQ0FBV1MsSUFBSUMsSUFBZixJQUF1QlgsS0FBS1ksUUFBTCxDQUFjRixHQUFkLENBQXZCO0FBQ0Q7QUFDRDtBQUNBLFFBQUlQLE9BQU9NLElBQVAsQ0FBWVQsS0FBS0MsS0FBakIsRUFBd0JPLE1BQXhCLEtBQW1DQSxNQUF2QyxFQUErQztBQUM3Q0QsZUFBU1AsS0FBS0UsS0FBTCxFQUFUO0FBQ0Q7QUFDRixHQXJCUTs7QUF1QlRVLFlBQVUsVUFBU0YsR0FBVCxFQUFjO0FBQ3RCO0FBQ0FBLFFBQUlDLElBQUosR0FBV0QsSUFBSUMsSUFBSixJQUFZLEVBQXZCO0FBQ0FELFFBQUlHLFdBQUosR0FBa0JILElBQUlHLFdBQUosSUFBbUIsRUFBckM7QUFDQSxXQUFPSCxHQUFQO0FBQ0Q7O0FBNUJRLENBQVg7O0FBZ0NBLGVBQWVWLElBQWYiLCJmaWxlIjoiY293cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBDb3dzID0ge1xuICBfZGF0YToge30sXG5cbiAgaXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKENvd3MuX2RhdGEpO1xuICB9LFxuXG4gIC8vIGFkZDogZnVuY3Rpb24obWVzc2FnZSwgY2FsbGJhY2sgPSAoKT0+e30pIHtcbiAgLy8gICBNZXNzYWdlcy5fZGF0YVttZXNzYWdlLm9iamVjdElkXSA9IG1lc3NhZ2U7XG4gIC8vICAgY2FsbGJhY2soTWVzc2FnZXMuaXRlbXMoKSk7XG4gIC8vIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbihjb3dzLCBjYWxsYmFjayA9ICgpPT57fSkge1xuICAgIHZhciBsZW5ndGggPSBPYmplY3Qua2V5cyhDb3dzLl9kYXRhKS5sZW5ndGg7XG4gICAgZm9yIChsZXQgY293IG9mIGNvd3MpIHtcbiAgICAgIENvd3MuX2RhdGFbY293Lm5hbWVdID0gQ293cy5fY29uZm9ybShjb3cpO1xuICAgIH1cbiAgICAvLyBvbmx5IGludm9rZSB0aGUgY2FsbGJhY2sgaWYgc29tZXRoaW5nIGNoYW5nZWRcbiAgICBpZiAoT2JqZWN0LmtleXMoQ293cy5fZGF0YSkubGVuZ3RoICE9PSBsZW5ndGgpIHtcbiAgICAgIGNhbGxiYWNrKENvd3MuaXRlbXMoKSk7XG4gICAgfVxuICB9LFxuXG4gIF9jb25mb3JtOiBmdW5jdGlvbihjb3cpIHtcbiAgICAvLyBlbnN1cmUgZWFjaCBjb3cgb2JqZWN0IGNvbmZvcm1zIHRvIGV4cGVjdGVkIHNoYXBlXG4gICAgY293Lm5hbWUgPSBjb3cubmFtZSB8fCAnJztcbiAgICBjb3cuZGVzY3JpcHRpb24gPSBjb3cuZGVzY3JpcHRpb24gfHwgJyc7XG4gICAgcmV0dXJuIGNvdztcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb3dzOyJdfQ==