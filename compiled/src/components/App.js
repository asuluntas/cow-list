import CowList from './CowList.js';
import Parse from '../parse.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cows: [],
      currentCow: null
    };
  }

  componentDidMount() {
    this.getCows();
  }

  getCows() {
    var app = this;
    Parse.readAll(function (data) {
      console.log(data);
      app.setState({ cows: data, currentCow: null });
    });
  }

  handleVideoListEntryTitleClick(cow) {}
  // this.setState({
  //   currentCow: cow
  // });


  /*
  * It's very important to bind the context of this callback.
  * Also acceptable is to pass a anonymous function expression with a fat
  * arrow that inherits the surrounding lexical `this` context:
  *
  *   handleVideoListEntryTitleClick={(video) => this.onVideoListEntryClick(video)}
  *                                  - or -
  *   handleVideoListEntryTitleClick={(currentVideo) => this.setState({currentVideo})}
  *
  */

  // this.handleVideoListEntryTitleClick.bind(this)
  render() {
    return React.createElement(CowList, {
      handleVideoListEntryTitleClick: null,
      cows: this.state.cows
    });
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOlsiQ293TGlzdCIsIlBhcnNlIiwiQXBwIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJjb3dzIiwiY3VycmVudENvdyIsImNvbXBvbmVudERpZE1vdW50IiwiZ2V0Q293cyIsImFwcCIsInJlYWRBbGwiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInNldFN0YXRlIiwiaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrIiwiY293IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxPQUFQLE1BQW9CLGNBQXBCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixhQUFsQjs7QUFFQSxNQUFNQyxHQUFOLFNBQWtCQyxNQUFNQyxTQUF4QixDQUFrQztBQUNoQ0MsY0FBWUMsS0FBWixFQUFtQjtBQUNqQixVQUFNQSxLQUFOOztBQUVBLFNBQUtDLEtBQUwsR0FBYTtBQUNYQyxZQUFNLEVBREs7QUFFWEMsa0JBQVk7QUFGRCxLQUFiO0FBSUQ7O0FBRURDLHNCQUFvQjtBQUNsQixTQUFLQyxPQUFMO0FBQ0Q7O0FBRURBLFlBQVU7QUFDUixRQUFJQyxNQUFNLElBQVY7QUFDQVgsVUFBTVksT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZTtBQUMzQkMsY0FBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0FGLFVBQUlLLFFBQUosQ0FBYSxFQUFDVCxNQUFNTSxJQUFQLEVBQWFMLFlBQVksSUFBekIsRUFBYjtBQUNELEtBSEQ7QUFJRDs7QUFFRFMsaUNBQStCQyxHQUEvQixFQUFvQyxDQUluQztBQUhDO0FBQ0E7QUFDQTs7O0FBR0Y7Ozs7Ozs7Ozs7O0FBV0E7QUFDQUMsV0FBUztBQUNQLFdBQ0Usb0JBQUMsT0FBRDtBQUNFLHNDQUFnQyxJQURsQztBQUVFLFlBQU0sS0FBS2IsS0FBTCxDQUFXQztBQUZuQixNQURGO0FBTUQ7QUEvQytCOztBQWtEbEM7QUFDQTtBQUNBLGVBQWVOLEdBQWYiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvd0xpc3QgZnJvbSAnLi9Db3dMaXN0LmpzJztcbmltcG9ydCBQYXJzZSBmcm9tICcuLi9wYXJzZS5qcyc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvd3M6IFtdLFxuICAgICAgY3VycmVudENvdzogbnVsbFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmdldENvd3MoKTtcbiAgfVxuXG4gIGdldENvd3MoKSB7XG4gICAgdmFyIGFwcCA9IHRoaXM7XG4gICAgUGFyc2UucmVhZEFsbChmdW5jdGlvbihkYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGFwcC5zZXRTdGF0ZSh7Y293czogZGF0YSwgY3VycmVudENvdzogbnVsbH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrKGNvdykge1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgY3VycmVudENvdzogY293XG4gICAgLy8gfSk7XG4gIH1cblxuICAvKlxuICAqIEl0J3MgdmVyeSBpbXBvcnRhbnQgdG8gYmluZCB0aGUgY29udGV4dCBvZiB0aGlzIGNhbGxiYWNrLlxuICAqIEFsc28gYWNjZXB0YWJsZSBpcyB0byBwYXNzIGEgYW5vbnltb3VzIGZ1bmN0aW9uIGV4cHJlc3Npb24gd2l0aCBhIGZhdFxuICAqIGFycm93IHRoYXQgaW5oZXJpdHMgdGhlIHN1cnJvdW5kaW5nIGxleGljYWwgYHRoaXNgIGNvbnRleHQ6XG4gICpcbiAgKiAgIGhhbmRsZVZpZGVvTGlzdEVudHJ5VGl0bGVDbGljaz17KHZpZGVvKSA9PiB0aGlzLm9uVmlkZW9MaXN0RW50cnlDbGljayh2aWRlbyl9XG4gICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLSBvciAtXG4gICogICBoYW5kbGVWaWRlb0xpc3RFbnRyeVRpdGxlQ2xpY2s9eyhjdXJyZW50VmlkZW8pID0+IHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRWaWRlb30pfVxuICAqXG4gICovXG5cbiAgLy8gdGhpcy5oYW5kbGVWaWRlb0xpc3RFbnRyeVRpdGxlQ2xpY2suYmluZCh0aGlzKVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb3dMaXN0XG4gICAgICAgIGhhbmRsZVZpZGVvTGlzdEVudHJ5VGl0bGVDbGljaz17bnVsbH1cbiAgICAgICAgY293cz17dGhpcy5zdGF0ZS5jb3dzfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbi8vIEluIHRoZSBFUzYgc3BlYywgZmlsZXMgYXJlIFwibW9kdWxlc1wiIGFuZCBkbyBub3Qgc2hhcmUgYSB0b3AtbGV2ZWwgc2NvcGVcbi8vIGB2YXJgIGRlY2xhcmF0aW9ucyB3aWxsIG9ubHkgZXhpc3QgZ2xvYmFsbHkgd2hlcmUgZXhwbGljaXRseSBkZWZpbmVkXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0=