import Parse from "../parse.js";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: '', description: ''};

    this.onSubmit = props.onSubmit;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value, description: this.state.description});
  }
  handleDescriptionChange(event) {
    this.setState({name: this.state.name, description: event.target.value});
  }

  handleSubmit(event) {
    Parse.create({name: this.state.name, description:this.state.description}, (data) => {
      this.onSubmit();
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Name: </label>
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        <label> Description: </label>
        <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default Form;