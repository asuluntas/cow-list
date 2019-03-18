import Search from './Search.js';
import VideoPlayer from './VideoPlayer.js';
import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };
  }

  handleVideoListEntryTitleClick(video) {
    this.setState({
      currentVideo: video
    });
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'nav',
        { className: 'navbar' },
        React.createElement(
          'div',
          { className: 'col-md-6 offset-md-3' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'h5',
              null,
              React.createElement(
                'em',
                null,
                'search'
              ),
              ' view goes here'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-md-7' },
          React.createElement(VideoPlayer, { video: this.state.currentVideo })
        ),
        React.createElement(
          'div',
          { className: 'col-md-5' },
          React.createElement(VideoList, {
            handleVideoListEntryTitleClick: this.handleVideoListEntryTitleClick.bind(this),
            videos: this.state.videos
          })
        )
      )
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOlsiU2VhcmNoIiwiVmlkZW9QbGF5ZXIiLCJWaWRlb0xpc3QiLCJleGFtcGxlVmlkZW9EYXRhIiwiQXBwIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJ2aWRlb3MiLCJjdXJyZW50VmlkZW8iLCJoYW5kbGVWaWRlb0xpc3RFbnRyeVRpdGxlQ2xpY2siLCJ2aWRlbyIsInNldFN0YXRlIiwicmVuZGVyIiwiYmluZCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsTUFBUCxNQUFtQixhQUFuQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0Isa0JBQXhCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixnQkFBdEI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2Qiw2QkFBN0I7O0FBR0EsTUFBTUMsR0FBTixTQUFrQkMsTUFBTUMsU0FBeEIsQ0FBa0M7QUFDaENDLGNBQVlDLEtBQVosRUFBbUI7QUFDakIsVUFBTUEsS0FBTjs7QUFFQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsY0FBUVAsZ0JBREc7QUFFWFEsb0JBQWNSLGlCQUFpQixDQUFqQjtBQUZILEtBQWI7QUFJRDs7QUFFRFMsaUNBQStCQyxLQUEvQixFQUFzQztBQUNwQyxTQUFLQyxRQUFMLENBQWM7QUFDWkgsb0JBQWNFO0FBREYsS0FBZDtBQUdEOztBQUVERSxXQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFFBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLHNCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUs7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFKO0FBQUE7QUFBQTtBQUFMO0FBREY7QUFERixPQURGO0FBTUU7QUFBQTtBQUFBLFVBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxVQUFmO0FBQ0UsOEJBQUMsV0FBRCxJQUFhLE9BQU8sS0FBS04sS0FBTCxDQUFXRSxZQUEvQjtBQURGLFNBREY7QUFJRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFVBQWY7QUFDRSw4QkFBQyxTQUFEO0FBQ0UsNENBQWdDLEtBQUtDLDhCQUFMLENBQW9DSSxJQUFwQyxDQUF5QyxJQUF6QyxDQURsQztBQUVFLG9CQUFRLEtBQUtQLEtBQUwsQ0FBV0M7QUFGckI7QUFERjtBQUpGO0FBTkYsS0FERjtBQW9CRDtBQXJDK0I7O0FBMENsQztBQUNBO0FBQ0EsZUFBZU4sR0FBZiIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VhcmNoIGZyb20gJy4vU2VhcmNoLmpzJztcbmltcG9ydCBWaWRlb1BsYXllciBmcm9tICcuL1ZpZGVvUGxheWVyLmpzJztcbmltcG9ydCBWaWRlb0xpc3QgZnJvbSAnLi9WaWRlb0xpc3QuanMnO1xuaW1wb3J0IGV4YW1wbGVWaWRlb0RhdGEgZnJvbSAnLi4vZGF0YS9leGFtcGxlVmlkZW9EYXRhLmpzJztcblxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWRlb3M6IGV4YW1wbGVWaWRlb0RhdGEsXG4gICAgICBjdXJyZW50VmlkZW86IGV4YW1wbGVWaWRlb0RhdGFbMF1cbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrKHZpZGVvKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjdXJyZW50VmlkZW86IHZpZGVvXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNiBvZmZzZXQtbWQtM1wiPlxuICAgICAgICAgICAgPGRpdj48aDU+PGVtPnNlYXJjaDwvZW0+IHZpZXcgZ29lcyBoZXJlPC9oNT48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uYXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtN1wiPlxuICAgICAgICAgICAgPFZpZGVvUGxheWVyIHZpZGVvPXt0aGlzLnN0YXRlLmN1cnJlbnRWaWRlb30vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTVcIj5cbiAgICAgICAgICAgIDxWaWRlb0xpc3RcbiAgICAgICAgICAgICAgaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrPXt0aGlzLmhhbmRsZVZpZGVvTGlzdEVudHJ5VGl0bGVDbGljay5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICB2aWRlb3M9e3RoaXMuc3RhdGUudmlkZW9zfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblxuXG4vLyBJbiB0aGUgRVM2IHNwZWMsIGZpbGVzIGFyZSBcIm1vZHVsZXNcIiBhbmQgZG8gbm90IHNoYXJlIGEgdG9wLWxldmVsIHNjb3BlXG4vLyBgdmFyYCBkZWNsYXJhdGlvbnMgd2lsbCBvbmx5IGV4aXN0IGdsb2JhbGx5IHdoZXJlIGV4cGxpY2l0bHkgZGVmaW5lZFxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl19