import Cow from './Cow.js';

var CowList = ({
  cows,
  handleCowClick
}) => React.createElement("div", {
  className: "cow-list"
}, cows.map(cow => React.createElement(Cow, {
  cow: cow,
  handleCowClick: handleCowClick
})));

CowList.propTypes = {
  cows: React.PropTypes.array.isRequired
};
export default CowList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpYy9jb21wb25lbnRzL0Nvd0xpc3QuanN4Il0sIm5hbWVzIjpbIkNvdyIsIkNvd0xpc3QiLCJjb3dzIiwiaGFuZGxlQ293Q2xpY2siLCJtYXAiLCJjb3ciLCJwcm9wVHlwZXMiLCJSZWFjdCIsIlByb3BUeXBlcyIsImFycmF5IiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsR0FBUCxNQUFnQixVQUFoQjs7QUFFQSxJQUFJQyxPQUFPLEdBQUcsQ0FBQztBQUFDQyxFQUFBQSxJQUFEO0FBQU9DLEVBQUFBO0FBQVAsQ0FBRCxLQUNaO0FBQUssRUFBQSxTQUFTLEVBQUM7QUFBZixHQUNHRCxJQUFJLENBQUNFLEdBQUwsQ0FBVUMsR0FBRCxJQUNSLG9CQUFDLEdBQUQ7QUFDRSxFQUFBLEdBQUcsRUFBRUEsR0FEUDtBQUVFLEVBQUEsY0FBYyxFQUFFRjtBQUZsQixFQURELENBREgsQ0FERjs7QUFXQUYsT0FBTyxDQUFDSyxTQUFSLEdBQW9CO0FBQ2xCSixFQUFBQSxJQUFJLEVBQUVLLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDO0FBRFYsQ0FBcEI7QUFJQSxlQUFlVCxPQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvdyBmcm9tICcuL0Nvdy5qcyc7XG5cbnZhciBDb3dMaXN0ID0gKHtjb3dzLCBoYW5kbGVDb3dDbGlja30pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJjb3ctbGlzdFwiPlxuICAgIHtjb3dzLm1hcCgoY293KSA9PlxuICAgICAgPENvd1xuICAgICAgICBjb3c9e2Nvd31cbiAgICAgICAgaGFuZGxlQ293Q2xpY2s9e2hhbmRsZUNvd0NsaWNrfVxuICAgICAgLz5cbiAgICApfVxuICA8L2Rpdj5cbik7XG5cbkNvd0xpc3QucHJvcFR5cGVzID0ge1xuICBjb3dzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ293TGlzdDtcbiJdfQ==