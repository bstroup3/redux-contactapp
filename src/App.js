import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import style from './mystyle.module.css'

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     
    this.state = {
      name: ''
    }
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.name
    }
    this.setState({
      name: ''
    });
    this.props.createContact(contact);
  }

  listView(data, index){
    return (
      <div className={style.Contact}>
        <div className="col-md-10">
          <li key={index} className={style.contactName}>
            {data.name}
          </li>
        </div>
        <div className={style.Remove}>
          <button onClick={(e) => this.deleteContact(e, index)} className={style.btnDanger}>
            Remove
          </button>
        </div>
    </div> 
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }

  render() {

    return(
      <div className="container">
        <h1 className={style.header}>Clientside Contacts Application</h1>
        <hr />
        <div className={style.form}>
          <h3 className={style.header2}>Add Contact Form</h3>
          <form className={style.submitForm} onSubmit={this.handleSubmit}>
            <p>Name</p>
            <input type="text" onChange={this.handleChange} className="form-control" value={this.state.name} placeholder="Enter Name"/><br />
            <input type="submit" className={style.btnSuccess} value="ADD"/>
          </form>
          <hr />
        { <ul className={style.listGroup}>
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);