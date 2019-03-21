var HighlightedCow = ({cow}) => (
  cow ?
    <div className="highlighted-cow">
      <div>{cow.name} </div>
      <div>{cow.description} </div>
    </div> :
    <div> </div>
);

HighlightedCow.propTypes = {
  cow: React.PropTypes.object.isRequired
};


export default HighlightedCow;
