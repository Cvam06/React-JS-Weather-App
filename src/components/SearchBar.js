import React, { Component } from "react";
import "../css/SearchBar.css";
import { Input, Message, Form } from "semantic-ui-react";
// import PlacesAutocomplete from 'reactjs-places-autocomplete';
// import {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from 'reactjs-places-autocomplete';

//api key = AIzaSyCCXqftIKsSpwCNVP5qKmcnVuxltUl7zR0

// export default class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { address: '' };
//   }
 
//   handleChange = address => {
//     this.setState({ address });
//   };
 
//   handleSelect = address => {
//     console.log("address = ",address)
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error));
//   };
 
//   render() {
//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     );
//   }
// }

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      warning: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendValueToParent = this.sendValueToParent.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  sendValueToParent(event) {
    event.preventDefault();
    // Check if the input field has been submitted empty or if it contains numbers
    if (this.state.value.trim() === "" || this.state.value.match(/\d+/g) !== null) {
      this.setState({ warning: true });
    } else {
      this.props.callBackFromParent(this.state.value);
      this.setState({ warning: false });
    }
  }

  render() {
    const errorMessage = (
      <Message error header="There was an error" content={this.props.error} />
    );
    const warningMessage = (
      <Message warning header="Please check that you've entered a valid city" />
    );

    return (
      <div className="SearchBar">
        {this.props.error && errorMessage}
        {this.state.warning && warningMessage}
        <Form onSubmit={this.sendValueToParent}>
          <Input
            className="SearchBar-input"
            placeholder="Search the weather in..."
            action={{ icon: "search" }}
            onChange={this.handleChange}
            value={this.state.value}
            size="huge"
            type="text"
            autoFocus
          />
        </Form>
      </div>
    );
  }
}

export default SearchBar;
