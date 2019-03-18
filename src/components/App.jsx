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
    this.getCows(function() {
      // console.log('before state', this, Cows.items());
      // console.log('after state', this, Cows.items());
      // this.forceUpdate();
      app.setState({cows: Cows.items(), currentCow: null});
    });
  }

  getCows(callback) {
    Parse.readAll(function(data) {
      Cows.update(data);
      callback();
    });
  }

  handleVideoListEntryTitleClick(cow) {
    // this.setState({
    //   currentCow: cow
    // });
  }

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
    return (
      <CowList
        handleVideoListEntryTitleClick={null}
        cows={Cows.items()}
      />
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
