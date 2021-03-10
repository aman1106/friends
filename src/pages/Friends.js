import {Component} from 'react';
import Modal from '../components/Modal/Modal';
import Alert from '../components/Alert/Alert';
import { FaRegStar, FaStar, FaRegTrashAlt } from 'react-icons/fa';

class Friends extends Component {
  state = {
    name: '',
    friends: [],
    searchedFriends: [],
    showDeleteModal: false,
    id: null,
    perPage: 4,
    pages: 0,
    currentPage: 1,
    invalidInput: false,
    showAlert: false,
    alertMessage: '',
  }

  // function to handle the input change
  handleInputChange = (e) => {
    if(!e.target.value) {
      let pages = Math.ceil(this.state.friends.length/4);
      this.setState((state, props) => ({...this.state, name: e.target.value, invalidInput: true, searchedFriends: state.friends, pages: pages}));
    } else {
      let friends = [];
      this.state.friends.forEach((friend, index) => {
        if((friend.name).toLowerCase().includes(e.target.value.toLowerCase())) {
          friends.push(friend);
        }
      })
      let pages = Math.ceil(friends.length/4);
      this.setState({...this.state, name: e.target.value, searchedFriends: friends, invalidInput: false, pages: pages});
    }
  }

  // function to submit input
  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.name) {
      this.setState({...this.state, invalidInput: true});
    } else {
      let friends = this.state.friends;
      friends.push({name: this.state.name, isStarred: false});
      let pages = Math.ceil(friends.length/4);
      this.setState({...this.state, name: '', friends: friends, searchedFriends: friends, pages: pages, invalidInput: false, showAlert: true, alertMessage: 'Congratulations! You added new friend.'});
    }
  }

  // function to show modal
  showDeleteModal = (id) => {
    this.setState({...this.state, showDeleteModal: true, id: id});
  }

  // function to close the modal
  modalClosed = () => {
    this.setState({...this.state, showDeleteModal: false});
  }

  // function to delete friend from list
  deleteItem = (id) => {
    let newList = this.state.friends.filter((friend, index) => index !== id);
    let pages = Math.ceil(newList.length/4);
    this.setState({...this.state, friends: newList, searchedFriends: newList, showDeleteModal: false, pages: pages, showAlert: true, alertMessage: 'Friend Deleted.'});
  }

  // function to star a friend
  markStar = (id) => {
    let isStar = false;
    this.state.friends.forEach((friend, index) => {
      if(index === id) {
        isStar = !friend.isStarred;
        friend.isStarred = !friend.isStarred;
      }
    });
    let friends = this.state.friends;
    friends.sort((a, b) => b.isStarred - a.isStarred);
    this.setState({...this.state, friends: friends, searchedFriends: friends, showAlert: true, alertMessage: isStar ? 'Friend starred.' : 'Friend Unstarred.'});
  }

  // function to handle pagination clicks
  handlePageClick = (e) => {
    this.setState({...this.state, currentPage: Number(e.target.id)});
  }

  // funtion to close the alert
  closeAlert = () => {
    this.setState({...this.state, showAlert: false});
  }

  render() {
    const pageNumbers = [];
    for (let i = 1; i <= this.state.pages; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <Alert show={this.state.showAlert} handleClose={this.closeAlert} message={this.state.alertMessage}/>
        <div className="app-title">Friends List</div>
        <form className="app-form" onSubmit={this.onSubmit}>
          <input className={`app-input required ${this.state.invalidInput ? 'invalid' : ''}`} placeholder="Enter your friend's name" value={this.state.name} onChange={this.handleInputChange}/>
          {this.state.invalidInput ? <p className="danger-text">Input can not be empty</p> : null}
        </form>
        {this.state.searchedFriends.map((friend, index) => {
          return (
            ((index < this.state.currentPage*this.state.perPage) && (index >= (this.state.currentPage-1)*this.state.perPage)) ?
            <div className="app-card" data-testid="friend-card" key={index}>
                <span className="grid-items left">
                  <div>{friend.name}</div>
                  <div className="friend-text">is your friend</div>
                </span>
                <span className="grid-items right">
                  <span className="icon-container right" onClick={() => this.showDeleteModal(index)}><FaRegTrashAlt className="icon" color='#b22222' size="1.5em"/></span>
                  <span className="icon-container right" onClick={() => this.markStar(index)}>{friend.isStarred ? <FaStar className="icon" color='#ffd300' size="1.5em"/> : <FaRegStar className="icon" color='#ffd300' size="1.5em"/>}</span>
              </span>
            </div> : ''
          );
        })}
        <div id="page-numbers" data-testid="page-numbers">
        {pageNumbers.map(number => {
          return (
            <button
              data-testid="pages"
              className={`pages ${(this.state.currentPage === number) ? 'active-page' : ''}`}
              key={number}
              id={number}
              onClick={this.handlePageClick}
            >
              {number}
            </button>
          );
        })}
        </div>
        <Modal show={this.state.showDeleteModal} handleClose={this.modalClosed} deleteItem={() => {this.deleteItem(this.state.id)}}>
            <p>Are you sure?</p>
        </Modal>
      </>
    );
  }
}

export default Friends;
