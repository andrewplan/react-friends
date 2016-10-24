import React from 'react';
import friends from '../../friends';
import Friend from './Friend';

export default class FriendsList extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            searchText: ''
            , searchBy: 'name'
            , orderBy: 'name'
            , order: 'ascending'
        };
    }

    handleChange( field, event ) {
        this.setState( { [ field ]: event.target.value } );
    }

    render() {
        const friendsList = friends
            .filter( friend => {
                if ( friend[ this.state.searchBy ] === null ) {
                    return false;
                }
                else if ( this.state.searchBy === 'name' ) {
                    return friend[ this.state.searchBy ].toLowerCase().indexOf( this.state.searchText.toLowerCase() ) !== -1;
                }
                else if ( this.state.searchBy === 'current_location' ) {
                    return friend[ this.state.searchBy ].city.toLowerCase().indexOf( this.state.searchText.toLowerCase() ) !== -1;
                }
                else if ( this.state.searchBy === 'status' ) {
                    return friend[ this.state.searchBy ].message.toLowerCase().indexOf( this.state.searchText.toLowerCase() ) !== -1;
                }
                else if ( this.state.searchBy === 'friend_count' ) {
                    return friend[ this.state.searchBy ].toString().toLowerCase().indexOf( this.state.searchText.toLowerCase() ) !== -1;
                }
            } )
            .sort( ( a, b ) => a[ this.state.orderBy ] > b[ this.state.orderBy ] )
            .map( friend =>
              <Friend
                  currentLocation={ friend.current_location || {} }
                  friendCount={ friend.friend_count }
                  key={ friend.$$hashKey }
                  name={ friend.name }
                  pictureUrl={ friend.pic_square }
                  status={ friend.status ? friend.status.message : '' }
              />
            );

        const displayFriends = this.state.order === 'ascending' ? friendsList : friendsList.slice().reverse();

        return (
            <div>
              <form
                  className="form-inline searchForm"
                  role="form"
              >
                  <div className="form-group">

                      <input
                          className="form-control"
                          onChange={ this.handleChange.bind( this, 'searchText' ) }
                          placeholder="Search For Friends"
                          value={ this.state.searchText }
                      />

                      <select
                          className="input-medium"
                          onChange={ this.handleChange.bind( this, 'searchBy' ) }
                          value={ this.state.searchBy }
                      >
                        <option value={ 'name' }>Name</option>
                        <option value={ 'current_location' }>Current Location</option>
                        <option value={ 'status' }>Status</option>
                        <option value={ 'friend_count' }>#Friends</option>
                      </select>

                      <select
                          className="input-medium"
                          onChange={ this.handleChange.bind( this, 'orderBy' ) }
                          value={ this.state.orderBy }
                      >
                        <option value={ 'name' }>Name</option>
                        <option value={ 'friend_count' }>#Friends</option>
                      </select>

                      <select
                          className="input-medium"
                          onChange={ this.handleChange.bind( this, 'order' ) }
                          value={ this.state.order }
                      >
                          <option value={ "descending" }>Descending</option>
                          <option value={ "ascending" }>Ascending</option>
                      </select>

                  </div>
              </form>

              <ul>
                  { displayFriends }
              </ul>
            </div>
        );
    }
}
