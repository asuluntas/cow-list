import Cow from './Cow.js';

var CowList = ({cows, handleCowClick}) => (
  <div className="cow-list">
    {cows.map((cow) =>
      <Cow
        cow={cow}
        handleCowClick={handleCowClick}
      />
    )}
  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
CowList.propTypes = {
  cows: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default CowList;
