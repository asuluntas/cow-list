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

Cow.propTypes = {
  cow: React.PropTypes.object.isRequired
};

export default Cow;
