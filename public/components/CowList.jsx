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

CowList.propTypes = {
  cows: React.PropTypes.array.isRequired
};

export default CowList;
