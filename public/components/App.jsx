import CowList from './CowList.js';
import HighlightedCow from './HighlightedCow.js';
import Form from './Form.js';
import Parse from '../parse.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cows: [],
      currentCow: null
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCowClick = this.handleCowClick.bind(this);
  }

  componentDidMount() {
    this.getCows();
  }

  getCows() {
    var app = this;
    Parse.readAll(function(data) {
      console.log(data);
      app.setState({cows: data, currentCow: null});
    });
  }

  handleCowClick(cow) {
    console.log('click listener', this, cow);
    this.setState({
      cows:this.state.cows,
      currentCow:cow
    });
    console.log('after state modification', this.state);
  }

  handleFormSubmit() {
    this.getCows();
  }

  render() {
    return (
      <div>
        <HighlightedCow
          cow={this.state.currentCow}
        />
        <Form onSubmit={this.handleFormSubmit}/>
        <CowList
          handleCowClick={this.handleCowClick}
          cows={this.state.cows}
        />
      </div>
    );
  }
}

export default App;
