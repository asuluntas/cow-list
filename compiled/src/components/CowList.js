import Cow from './Cow.js';

var CowList = ({ cows, handleCowClick }) => React.createElement(
  "div",
  { className: "cow-list" },
  cows.map(cow => React.createElement(Cow, {
    cow: cow,
    handleCowClick: handleCowClick
  }))
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
CowList.propTypes = {
  cows: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default CowList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Nvd0xpc3QuanN4Il0sIm5hbWVzIjpbIkNvdyIsIkNvd0xpc3QiLCJjb3dzIiwiaGFuZGxlQ293Q2xpY2siLCJtYXAiLCJjb3ciLCJwcm9wVHlwZXMiLCJSZWFjdCIsIlByb3BUeXBlcyIsImFycmF5IiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsR0FBUCxNQUFnQixVQUFoQjs7QUFFQSxJQUFJQyxVQUFVLENBQUMsRUFBQ0MsSUFBRCxFQUFPQyxjQUFQLEVBQUQsS0FDWjtBQUFBO0FBQUEsSUFBSyxXQUFVLFVBQWY7QUFDR0QsT0FBS0UsR0FBTCxDQUFVQyxHQUFELElBQ1Isb0JBQUMsR0FBRDtBQUNFLFNBQUtBLEdBRFA7QUFFRSxvQkFBZ0JGO0FBRmxCLElBREQ7QUFESCxDQURGOztBQVdBO0FBQ0E7QUFDQUYsUUFBUUssU0FBUixHQUFvQjtBQUNsQkosUUFBTUssTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDO0FBRFYsQ0FBcEI7O0FBSUE7QUFDQTtBQUNBLGVBQWVULE9BQWYiLCJmaWxlIjoiQ293TGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb3cgZnJvbSAnLi9Db3cuanMnO1xuXG52YXIgQ293TGlzdCA9ICh7Y293cywgaGFuZGxlQ293Q2xpY2t9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiY293LWxpc3RcIj5cbiAgICB7Y293cy5tYXAoKGNvdykgPT5cbiAgICAgIDxDb3dcbiAgICAgICAgY293PXtjb3d9XG4gICAgICAgIGhhbmRsZUNvd0NsaWNrPXtoYW5kbGVDb3dDbGlja31cbiAgICAgIC8+XG4gICAgKX1cbiAgPC9kaXY+XG4pO1xuXG4vLyBQcm9wVHlwZXMgdGVsbCBvdGhlciBkZXZlbG9wZXJzIHdoYXQgYHByb3BzYCBhIGNvbXBvbmVudCBleHBlY3RzXG4vLyBXYXJuaW5ncyB3aWxsIGJlIHNob3duIGluIHRoZSBjb25zb2xlIHdoZW4gdGhlIGRlZmluZWQgcnVsZXMgYXJlIHZpb2xhdGVkXG5Db3dMaXN0LnByb3BUeXBlcyA9IHtcbiAgY293czogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbn07XG5cbi8vIEluIHRoZSBFUzYgc3BlYywgZmlsZXMgYXJlIFwibW9kdWxlc1wiIGFuZCBkbyBub3Qgc2hhcmUgYSB0b3AtbGV2ZWwgc2NvcGUuXG4vLyBgdmFyYCBkZWNsYXJhdGlvbnMgd2lsbCBvbmx5IGV4aXN0IGdsb2JhbGx5IHdoZXJlIGV4cGxpY2l0bHkgZGVmaW5lZC5cbmV4cG9ydCBkZWZhdWx0IENvd0xpc3Q7XG4iXX0=