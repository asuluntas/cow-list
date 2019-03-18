var VideoPlayer = props => React.createElement(
  "div",
  { className: "video-player" },
  React.createElement(
    "div",
    { className: "embed-responsive embed-responsive-16by9" },
    React.createElement("iframe", { className: "embed-responsive-item", src: 'https://www.youtube.com/embed/' + props.video.id.videoId, allowFullScreen: true })
  ),
  React.createElement(
    "div",
    { className: "video-player-details" },
    React.createElement(
      "h3",
      null,
      props.video.snippet.title
    ),
    React.createElement(
      "div",
      null,
      props.video.snippet.description
    )
  )
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoPlayer.propTypes = {
  video: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default VideoPlayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZpZGVvUGxheWVyLmpzeCJdLCJuYW1lcyI6WyJWaWRlb1BsYXllciIsInByb3BzIiwidmlkZW8iLCJpZCIsInZpZGVvSWQiLCJzbmlwcGV0IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInByb3BUeXBlcyIsIlJlYWN0IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsY0FBZUMsS0FBRCxJQUNoQjtBQUFBO0FBQUEsSUFBSyxXQUFVLGNBQWY7QUFDRTtBQUFBO0FBQUEsTUFBSyxXQUFVLHlDQUFmO0FBQ0Usb0NBQVEsV0FBVSx1QkFBbEIsRUFBMEMsS0FBSyxtQ0FBbUNBLE1BQU1DLEtBQU4sQ0FBWUMsRUFBWixDQUFlQyxPQUFqRyxFQUEwRyxxQkFBMUc7QUFERixHQURGO0FBSUU7QUFBQTtBQUFBLE1BQUssV0FBVSxzQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFLSCxZQUFNQyxLQUFOLENBQVlHLE9BQVosQ0FBb0JDO0FBQXpCLEtBREY7QUFFRTtBQUFBO0FBQUE7QUFBTUwsWUFBTUMsS0FBTixDQUFZRyxPQUFaLENBQW9CRTtBQUExQjtBQUZGO0FBSkYsQ0FERjs7QUFZQTtBQUNBO0FBQ0FQLFlBQVlRLFNBQVosR0FBd0I7QUFDdEJOLFNBQU9PLE1BQU1DLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCQztBQURSLENBQXhCOztBQUlBO0FBQ0E7QUFDQSxlQUFlWixXQUFmIiwiZmlsZSI6IlZpZGVvUGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFZpZGVvUGxheWVyID0gKHByb3BzKSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwidmlkZW8tcGxheWVyXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJlbWJlZC1yZXNwb25zaXZlIGVtYmVkLXJlc3BvbnNpdmUtMTZieTlcIj5cbiAgICAgIDxpZnJhbWUgY2xhc3NOYW1lPVwiZW1iZWQtcmVzcG9uc2l2ZS1pdGVtXCIgc3JjPXsnaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArIHByb3BzLnZpZGVvLmlkLnZpZGVvSWR9IGFsbG93RnVsbFNjcmVlbj48L2lmcmFtZT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZGVvLXBsYXllci1kZXRhaWxzXCI+XG4gICAgICA8aDM+e3Byb3BzLnZpZGVvLnNuaXBwZXQudGl0bGV9PC9oMz5cbiAgICAgIDxkaXY+e3Byb3BzLnZpZGVvLnNuaXBwZXQuZGVzY3JpcHRpb259PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuLy8gUHJvcFR5cGVzIHRlbGwgb3RoZXIgZGV2ZWxvcGVycyB3aGF0IGBwcm9wc2AgYSBjb21wb25lbnQgZXhwZWN0c1xuLy8gV2FybmluZ3Mgd2lsbCBiZSBzaG93biBpbiB0aGUgY29uc29sZSB3aGVuIHRoZSBkZWZpbmVkIHJ1bGVzIGFyZSB2aW9sYXRlZFxuVmlkZW9QbGF5ZXIucHJvcFR5cGVzID0ge1xuICB2aWRlbzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuXG4vLyBJbiB0aGUgRVM2IHNwZWMsIGZpbGVzIGFyZSBcIm1vZHVsZXNcIiBhbmQgZG8gbm90IHNoYXJlIGEgdG9wLWxldmVsIHNjb3BlXG4vLyBgdmFyYCBkZWNsYXJhdGlvbnMgd2lsbCBvbmx5IGV4aXN0IGdsb2JhbGx5IHdoZXJlIGV4cGxpY2l0bHkgZGVmaW5lZFxuZXhwb3J0IGRlZmF1bHQgVmlkZW9QbGF5ZXI7XG4iXX0=