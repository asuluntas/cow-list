import Parse from "../parse.js";

class FormView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', description: '' };

    this.onSubmit = props.onSubmit;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value, description: this.state.description });
  }
  handleDescriptionChange(event) {
    this.setState({ name: this.state.name, description: event.target.value });
  }

  handleSubmit(event) {
    Parse.create({ name: this.state.name, description: this.state.description }, data => {
      this.onSubmit();
    });
    event.preventDefault();
  }

  render() {
    return React.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      React.createElement(
        'label',
        null,
        ' Name: '
      ),
      React.createElement('input', { type: 'text', value: this.state.name, onChange: this.handleNameChange }),
      React.createElement(
        'label',
        null,
        ' Description: '
      ),
      React.createElement('input', { type: 'text', value: this.state.description, onChange: this.handleDescriptionChange }),
      React.createElement('input', { type: 'submit', value: 'Submit' })
    );
  }
}

export default FormView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Zvcm1WaWV3LmpzeCJdLCJuYW1lcyI6WyJQYXJzZSIsIkZvcm1WaWV3IiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJvblN1Ym1pdCIsImhhbmRsZU5hbWVDaGFuZ2UiLCJiaW5kIiwiaGFuZGxlRGVzY3JpcHRpb25DaGFuZ2UiLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInNldFN0YXRlIiwidGFyZ2V0IiwidmFsdWUiLCJjcmVhdGUiLCJkYXRhIiwicHJldmVudERlZmF1bHQiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLEtBQVAsTUFBa0IsYUFBbEI7O0FBRUEsTUFBTUMsUUFBTixTQUF1QkMsTUFBTUMsU0FBN0IsQ0FBdUM7QUFDckNDLGNBQVlDLEtBQVosRUFBbUI7QUFDakIsVUFBTUEsS0FBTjs7QUFFQSxTQUFLQyxLQUFMLEdBQWEsRUFBQ0MsTUFBTSxFQUFQLEVBQVdDLGFBQWEsRUFBeEIsRUFBYjs7QUFFQSxTQUFLQyxRQUFMLEdBQWdCSixNQUFNSSxRQUF0Qjs7QUFFQSxTQUFLQyxnQkFBTCxHQUF3QixLQUFLQSxnQkFBTCxDQUFzQkMsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBeEI7QUFDQSxTQUFLQyx1QkFBTCxHQUErQixLQUFLQSx1QkFBTCxDQUE2QkQsSUFBN0IsQ0FBa0MsSUFBbEMsQ0FBL0I7QUFDQSxTQUFLRSxZQUFMLEdBQW9CLEtBQUtBLFlBQUwsQ0FBa0JGLElBQWxCLENBQXVCLElBQXZCLENBQXBCO0FBQ0Q7O0FBRURELG1CQUFpQkksS0FBakIsRUFBd0I7QUFDdEIsU0FBS0MsUUFBTCxDQUFjLEVBQUNSLE1BQU1PLE1BQU1FLE1BQU4sQ0FBYUMsS0FBcEIsRUFBMkJULGFBQWEsS0FBS0YsS0FBTCxDQUFXRSxXQUFuRCxFQUFkO0FBQ0Q7QUFDREksMEJBQXdCRSxLQUF4QixFQUErQjtBQUM3QixTQUFLQyxRQUFMLENBQWMsRUFBQ1IsTUFBTSxLQUFLRCxLQUFMLENBQVdDLElBQWxCLEVBQXdCQyxhQUFhTSxNQUFNRSxNQUFOLENBQWFDLEtBQWxELEVBQWQ7QUFDRDs7QUFFREosZUFBYUMsS0FBYixFQUFvQjtBQUNsQmQsVUFBTWtCLE1BQU4sQ0FBYSxFQUFDWCxNQUFNLEtBQUtELEtBQUwsQ0FBV0MsSUFBbEIsRUFBd0JDLGFBQVksS0FBS0YsS0FBTCxDQUFXRSxXQUEvQyxFQUFiLEVBQTJFVyxJQUFELElBQVU7QUFDbEYsV0FBS1YsUUFBTDtBQUNELEtBRkQ7QUFHQUssVUFBTU0sY0FBTjtBQUNEOztBQUVEQyxXQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBTSxVQUFVLEtBQUtSLFlBQXJCO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUUscUNBQU8sTUFBSyxNQUFaLEVBQW1CLE9BQU8sS0FBS1AsS0FBTCxDQUFXQyxJQUFyQyxFQUEyQyxVQUFVLEtBQUtHLGdCQUExRCxHQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUhGO0FBSUUscUNBQU8sTUFBSyxNQUFaLEVBQW1CLE9BQU8sS0FBS0osS0FBTCxDQUFXRSxXQUFyQyxFQUFrRCxVQUFVLEtBQUtJLHVCQUFqRSxHQUpGO0FBS0UscUNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sUUFBM0I7QUFMRixLQURGO0FBU0Q7QUFyQ29DOztBQXdDdkMsZUFBZVgsUUFBZiIsImZpbGUiOiJGb3JtVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJzZSBmcm9tIFwiLi4vcGFyc2UuanNcIjtcblxuY2xhc3MgRm9ybVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7bmFtZTogJycsIGRlc2NyaXB0aW9uOiAnJ307XG5cbiAgICB0aGlzLm9uU3VibWl0ID0gcHJvcHMub25TdWJtaXQ7XG5cbiAgICB0aGlzLmhhbmRsZU5hbWVDaGFuZ2UgPSB0aGlzLmhhbmRsZU5hbWVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURlc2NyaXB0aW9uQ2hhbmdlID0gdGhpcy5oYW5kbGVEZXNjcmlwdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZU5hbWVDaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtuYW1lOiBldmVudC50YXJnZXQudmFsdWUsIGRlc2NyaXB0aW9uOiB0aGlzLnN0YXRlLmRlc2NyaXB0aW9ufSk7XG4gIH1cbiAgaGFuZGxlRGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtuYW1lOiB0aGlzLnN0YXRlLm5hbWUsIGRlc2NyaXB0aW9uOiBldmVudC50YXJnZXQudmFsdWV9KTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChldmVudCkge1xuICAgIFBhcnNlLmNyZWF0ZSh7bmFtZTogdGhpcy5zdGF0ZS5uYW1lLCBkZXNjcmlwdGlvbjp0aGlzLnN0YXRlLmRlc2NyaXB0aW9ufSwgKGRhdGEpID0+IHtcbiAgICAgIHRoaXMub25TdWJtaXQoKTtcbiAgICB9KTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICA8bGFiZWw+IE5hbWU6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLm5hbWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU5hbWVDaGFuZ2V9IC8+XG4gICAgICAgIDxsYWJlbD4gRGVzY3JpcHRpb246IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLmRlc2NyaXB0aW9ufSBvbkNoYW5nZT17dGhpcy5oYW5kbGVEZXNjcmlwdGlvbkNoYW5nZX0gLz5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiLz5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1WaWV3OyJdfQ==