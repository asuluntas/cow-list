// class HighlightedCow extends React.Component {
//   constructor(props) {
//     super(props);

//     console.log(props.cow);
//     this.cow = props.cow;
//   }

//   render() {
//     console.log('highlighted cow', this.cow);
//     if (this.cow) {
//       return (
//         <div>
//           <div>{this.cow.name} </div>
//           <div>{this.cow.description} </div>
//         </div>
//       );
//     } else {
//       return (<div> </div>);
//     }
//   }
// }

var HighlightedCow = ({ cow }) => cow ? React.createElement(
  "div",
  { className: "highlighted-cow" },
  React.createElement(
    "div",
    null,
    cow.name,
    " "
  ),
  React.createElement(
    "div",
    null,
    cow.description,
    " "
  )
) : React.createElement(
  "div",
  null,
  " "
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
HighlightedCow.propTypes = {
  cow: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default HighlightedCow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0hpZ2hsaWdodGVkQ293LmpzeCJdLCJuYW1lcyI6WyJIaWdobGlnaHRlZENvdyIsImNvdyIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInByb3BUeXBlcyIsIlJlYWN0IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUlBLGlCQUFpQixDQUFDLEVBQUNDLEdBQUQsRUFBRCxLQUNuQkEsTUFDQTtBQUFBO0FBQUEsSUFBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQU1BLFFBQUlDLElBQVY7QUFBQTtBQUFBLEdBREo7QUFFSTtBQUFBO0FBQUE7QUFBTUQsUUFBSUUsV0FBVjtBQUFBO0FBQUE7QUFGSixDQURBLEdBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQU5GOztBQVNBO0FBQ0E7QUFDQUgsZUFBZUksU0FBZixHQUEyQjtBQUN6QkgsT0FBS0ksTUFBTUMsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDO0FBREgsQ0FBM0I7O0FBSUE7QUFDQTtBQUNBLGVBQWVSLGNBQWYiLCJmaWxlIjoiSGlnaGxpZ2h0ZWRDb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjbGFzcyBIaWdobGlnaHRlZENvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4vLyAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4vLyAgICAgc3VwZXIocHJvcHMpO1xuXG4vLyAgICAgY29uc29sZS5sb2cocHJvcHMuY293KTtcbi8vICAgICB0aGlzLmNvdyA9IHByb3BzLmNvdztcbi8vICAgfVxuXG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICBjb25zb2xlLmxvZygnaGlnaGxpZ2h0ZWQgY293JywgdGhpcy5jb3cpO1xuLy8gICAgIGlmICh0aGlzLmNvdykge1xuLy8gICAgICAgcmV0dXJuIChcbi8vICAgICAgICAgPGRpdj5cbi8vICAgICAgICAgICA8ZGl2Pnt0aGlzLmNvdy5uYW1lfSA8L2Rpdj5cbi8vICAgICAgICAgICA8ZGl2Pnt0aGlzLmNvdy5kZXNjcmlwdGlvbn0gPC9kaXY+XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgcmV0dXJuICg8ZGl2PiA8L2Rpdj4pO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG52YXIgSGlnaGxpZ2h0ZWRDb3cgPSAoe2Nvd30pID0+IChcbiAgY293ID9cbiAgPGRpdiBjbGFzc05hbWU9XCJoaWdobGlnaHRlZC1jb3dcIj5cbiAgICAgIDxkaXY+e2Nvdy5uYW1lfSA8L2Rpdj5cbiAgICAgIDxkaXY+e2Nvdy5kZXNjcmlwdGlvbn0gPC9kaXY+XG4gIDwvZGl2PiA6XG4gIDxkaXY+IDwvZGl2PlxuKTtcblxuLy8gUHJvcFR5cGVzIHRlbGwgb3RoZXIgZGV2ZWxvcGVycyB3aGF0IGBwcm9wc2AgYSBjb21wb25lbnQgZXhwZWN0c1xuLy8gV2FybmluZ3Mgd2lsbCBiZSBzaG93biBpbiB0aGUgY29uc29sZSB3aGVuIHRoZSBkZWZpbmVkIHJ1bGVzIGFyZSB2aW9sYXRlZFxuSGlnaGxpZ2h0ZWRDb3cucHJvcFR5cGVzID0ge1xuICBjb3c6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuLy8gSW4gdGhlIEVTNiBzcGVjLCBmaWxlcyBhcmUgXCJtb2R1bGVzXCIgYW5kIGRvIG5vdCBzaGFyZSBhIHRvcC1sZXZlbCBzY29wZVxuLy8gYHZhcmAgZGVjbGFyYXRpb25zIHdpbGwgb25seSBleGlzdCBnbG9iYWxseSB3aGVyZSBleHBsaWNpdGx5IGRlZmluZWRcbmV4cG9ydCBkZWZhdWx0IEhpZ2hsaWdodGVkQ293O1xuIl19