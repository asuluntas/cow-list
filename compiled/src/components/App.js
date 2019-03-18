import CowList from './CowList.js';
import Parse from '../parse.js';
import Cows from '../cows.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cows: [],
      currentCow: null
    };
    //this.currentCow = null;
  }

  componentDidMount() {
    var app = this;
    this.getCows(function () {
      // console.log('before state', this, Cows.items());
      // console.log('after state', this, Cows.items());
      // this.forceUpdate();
      app.setState({ cows: Cows.items(), currentCow: null });
    });
  }

  getCows(callback) {
    Parse.readAll(function (data) {
      Cows.update(data);
      callback();
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

  render() {
    return React.createElement(CowList, {
      handleVideoListEntryTitleClick: null // this.handleVideoListEntryTitleClick.bind(this)
      , cows: Cows.items()
    });
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOlsiQ293TGlzdCIsIlBhcnNlIiwiQ293cyIsIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY293cyIsImN1cnJlbnRDb3ciLCJjb21wb25lbnREaWRNb3VudCIsImFwcCIsImdldENvd3MiLCJzZXRTdGF0ZSIsIml0ZW1zIiwiY2FsbGJhY2siLCJyZWFkQWxsIiwiZGF0YSIsInVwZGF0ZSIsImhhbmRsZVZpZGVvTGlzdEVudHJ5VGl0bGVDbGljayIsImNvdyIsInJlbmRlciJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsT0FBUCxNQUFvQixjQUFwQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLFlBQWpCOztBQUVBLE1BQU1DLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47O0FBRUEsU0FBS0MsS0FBTCxHQUFhO0FBQ1hDLFlBQU0sRUFESztBQUVYQyxrQkFBWTtBQUZELEtBQWI7QUFJQTtBQUNEOztBQUVEQyxzQkFBb0I7QUFDbEIsUUFBSUMsTUFBTSxJQUFWO0FBQ0EsU0FBS0MsT0FBTCxDQUFhLFlBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0FELFVBQUlFLFFBQUosQ0FBYSxFQUFDTCxNQUFNUCxLQUFLYSxLQUFMLEVBQVAsRUFBcUJMLFlBQVksSUFBakMsRUFBYjtBQUNELEtBTEQ7QUFNRDs7QUFFREcsVUFBUUcsUUFBUixFQUFrQjtBQUNoQmYsVUFBTWdCLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWU7QUFDM0JoQixXQUFLaUIsTUFBTCxDQUFZRCxJQUFaO0FBQ0FGO0FBQ0QsS0FIRDtBQUlEOztBQUVESSxpQ0FBK0JDLEdBQS9CLEVBQW9DLENBSW5DO0FBSEM7QUFDQTtBQUNBOzs7QUFJQTs7Ozs7Ozs7Ozs7QUFZRkMsV0FBUztBQUNQLFdBQ0Usb0JBQUMsT0FBRDtBQUNFLHNDQUFnQyxJQURsQyxDQUN3QztBQUR4QyxRQUVFLE1BQU1wQixLQUFLYSxLQUFMO0FBRlIsTUFERjtBQU1EO0FBdEQrQjs7QUF5RGxDO0FBQ0E7QUFDQSxlQUFlWixHQUFmIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb3dMaXN0IGZyb20gJy4vQ293TGlzdC5qcyc7XG5pbXBvcnQgUGFyc2UgZnJvbSAnLi4vcGFyc2UuanMnO1xuaW1wb3J0IENvd3MgZnJvbSAnLi4vY293cy5qcyc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvd3M6IFtdLFxuICAgICAgY3VycmVudENvdzogbnVsbFxuICAgIH07XG4gICAgLy90aGlzLmN1cnJlbnRDb3cgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdmFyIGFwcCA9IHRoaXM7XG4gICAgdGhpcy5nZXRDb3dzKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2JlZm9yZSBzdGF0ZScsIHRoaXMsIENvd3MuaXRlbXMoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnYWZ0ZXIgc3RhdGUnLCB0aGlzLCBDb3dzLml0ZW1zKCkpO1xuICAgICAgLy8gdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgYXBwLnNldFN0YXRlKHtjb3dzOiBDb3dzLml0ZW1zKCksIGN1cnJlbnRDb3c6IG51bGx9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvd3MoY2FsbGJhY2spIHtcbiAgICBQYXJzZS5yZWFkQWxsKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIENvd3MudXBkYXRlKGRhdGEpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrKGNvdykge1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgY3VycmVudENvdzogY293XG4gICAgLy8gfSk7XG4gIH1cblxuXG4gICAgLypcbiAgICAqIEl0J3MgdmVyeSBpbXBvcnRhbnQgdG8gYmluZCB0aGUgY29udGV4dCBvZiB0aGlzIGNhbGxiYWNrLlxuICAgICogQWxzbyBhY2NlcHRhYmxlIGlzIHRvIHBhc3MgYSBhbm9ueW1vdXMgZnVuY3Rpb24gZXhwcmVzc2lvbiB3aXRoIGEgZmF0XG4gICAgKiBhcnJvdyB0aGF0IGluaGVyaXRzIHRoZSBzdXJyb3VuZGluZyBsZXhpY2FsIGB0aGlzYCBjb250ZXh0OlxuICAgICpcbiAgICAqICAgaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrPXsodmlkZW8pID0+IHRoaXMub25WaWRlb0xpc3RFbnRyeUNsaWNrKHZpZGVvKX1cbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gb3IgLVxuICAgICogICBoYW5kbGVWaWRlb0xpc3RFbnRyeVRpdGxlQ2xpY2s9eyhjdXJyZW50VmlkZW8pID0+IHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRWaWRlb30pfVxuICAgICpcbiAgICAqL1xuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Q293TGlzdFxuICAgICAgICBoYW5kbGVWaWRlb0xpc3RFbnRyeVRpdGxlQ2xpY2s9e251bGx9IC8vIHRoaXMuaGFuZGxlVmlkZW9MaXN0RW50cnlUaXRsZUNsaWNrLmJpbmQodGhpcylcbiAgICAgICAgY293cz17Q293cy5pdGVtcygpfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbi8vIEluIHRoZSBFUzYgc3BlYywgZmlsZXMgYXJlIFwibW9kdWxlc1wiIGFuZCBkbyBub3Qgc2hhcmUgYSB0b3AtbGV2ZWwgc2NvcGVcbi8vIGB2YXJgIGRlY2xhcmF0aW9ucyB3aWxsIG9ubHkgZXhpc3QgZ2xvYmFsbHkgd2hlcmUgZXhwbGljaXRseSBkZWZpbmVkXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0=