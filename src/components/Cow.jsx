class Cow extends React.Component {
  constructor(props) {
    super(props);

    this.cow = props.cow;
    this.handleCowClick = props.handleCowClick;
  }

  render() {
    return (
      <div onClick={() => this.handleCowClick(this.cow)}> {this.cow.name} </div>
    );
  }
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Cow.propTypes = {
  cow: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Cow;
