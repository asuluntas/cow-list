
var Cow = ({ cow, handleVideoListEntryTitleClick }) =>
// <div className="video-list-entry media">
//   <div className="media-body">
//     <div
//       className="video-list-entry-title"
//       onClick={() => handleVideoListEntryTitleClick(cow)}
//     >
//       {cow.name}
//     </div>
//     <div className="video-list-entry-detail">{cow.description}</div>
//   </div>
// </div>
React.createElement(
  "div",
  null,
  " ",
  cow.name,
  " "
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Cow.propTypes = {
  cow: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Cow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Nvdy5qc3giXSwibmFtZXMiOlsiQ293IiwiY293IiwiaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrIiwibmFtZSIsInByb3BUeXBlcyIsIlJlYWN0IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6IjtBQUNBLElBQUlBLE1BQU0sQ0FBQyxFQUFDQyxHQUFELEVBQU1DLDhCQUFOLEVBQUQ7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBT0QsTUFBSUUsSUFBWDtBQUFBO0FBQUEsQ0FaRjs7QUFlQTtBQUNBO0FBQ0FILElBQUlJLFNBQUosR0FBZ0I7QUFDZEgsT0FBS0ksTUFBTUMsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDO0FBRGQsQ0FBaEI7O0FBSUE7QUFDQTtBQUNBLGVBQWVSLEdBQWYiLCJmaWxlIjoiQ293LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgQ293ID0gKHtjb3csIGhhbmRsZVZpZGVvTGlzdEVudHJ5VGl0bGVDbGlja30pID0+IChcbiAgLy8gPGRpdiBjbGFzc05hbWU9XCJ2aWRlby1saXN0LWVudHJ5IG1lZGlhXCI+XG4gIC8vICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1ib2R5XCI+XG4gIC8vICAgICA8ZGl2XG4gIC8vICAgICAgIGNsYXNzTmFtZT1cInZpZGVvLWxpc3QtZW50cnktdGl0bGVcIlxuICAvLyAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVWaWRlb0xpc3RFbnRyeVRpdGxlQ2xpY2soY293KX1cbiAgLy8gICAgID5cbiAgLy8gICAgICAge2Nvdy5uYW1lfVxuICAvLyAgICAgPC9kaXY+XG4gIC8vICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZGVvLWxpc3QtZW50cnktZGV0YWlsXCI+e2Nvdy5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgLy8gICA8L2Rpdj5cbiAgLy8gPC9kaXY+XG4gIDxkaXY+IHtjb3cubmFtZX0gPC9kaXY+XG4pO1xuXG4vLyBQcm9wVHlwZXMgdGVsbCBvdGhlciBkZXZlbG9wZXJzIHdoYXQgYHByb3BzYCBhIGNvbXBvbmVudCBleHBlY3RzXG4vLyBXYXJuaW5ncyB3aWxsIGJlIHNob3duIGluIHRoZSBjb25zb2xlIHdoZW4gdGhlIGRlZmluZWQgcnVsZXMgYXJlIHZpb2xhdGVkXG5Db3cucHJvcFR5cGVzID0ge1xuICBjb3c6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuLy8gSW4gdGhlIEVTNiBzcGVjLCBmaWxlcyBhcmUgXCJtb2R1bGVzXCIgYW5kIGRvIG5vdCBzaGFyZSBhIHRvcC1sZXZlbCBzY29wZVxuLy8gYHZhcmAgZGVjbGFyYXRpb25zIHdpbGwgb25seSBleGlzdCBnbG9iYWxseSB3aGVyZSBleHBsaWNpdGx5IGRlZmluZWRcbmV4cG9ydCBkZWZhdWx0IENvdztcbiJdfQ==