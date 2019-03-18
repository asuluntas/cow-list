// class HighlightedCow extends React.Component {
//   constructor(props) {
//     super(props);

//     console.log(props.cow);
//     this.cow = props.cow;
//   }

//   render() {
//     console.log('highlighted cow', this.cow);
//     if (this.cow) {
//       return (
//         <div>
//           <div>{this.cow.name} </div>
//           <div>{this.cow.description} </div>
//         </div>
//       );
//     } else {
//       return (<div> </div>);
//     }
//   }
// }

var HighlightedCow = ({cow}) => (
  cow ?
    <div className="highlighted-cow">
      <div>{cow.name} </div>
      <div>{cow.description} </div>
    </div> :
    <div> </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
HighlightedCow.propTypes = {
  cow: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default HighlightedCow;
