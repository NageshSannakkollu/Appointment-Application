// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    starButtonClicked: false,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      titleInput,
      dateInput: new Date(dateInput),
      isStarred: false,
      id: uuidv4(),
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  starClicked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachMap => {
        if (id === eachMap.id) {
          return {...eachMap, isStarred: !eachMap.isStarred}
        }
        return eachMap
      }),
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  starredButton = () => {
    this.setState(prevState => ({
      starButtonClicked: !prevState.starButtonClicked,
    }))
  }

  renderTitleInput = () => {
    const {titleInput} = this.state
    return (
      <div>
        <label htmlFor="title-input">TITLE</label>
        <br />
        <input
          id="title-input"
          placeholder="TITLE"
          className="input"
          onChange={this.onChangeTitleInput}
          value={titleInput}
        />
      </div>
    )
  }

  renderDateInput = () => {
    const {dateInput} = this.state
    return (
      <div>
        <label htmlFor="date-input">DATE</label>
        <br />
        <input
          id="date-input"
          type="date"
          className="input"
          onChange={this.onChangeDate}
          value={dateInput}
        />
      </div>
    )
  }

  render() {
    const {appointmentList, starButtonClicked} = this.state
    console.log(appointmentList)
    const starredLists = appointmentList.filter(
      eachStar => eachStar.isStarred === true,
    )
    const finalAppointments = starButtonClicked ? starredLists : appointmentList

    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="appointment-heading">Add Appointment</h1>
          <div className="appointment-inputs">
            <form className="form" onSubmit={this.onSubmitForm}>
              <div className="inputs-container">
                {this.renderTitleInput()}
                {this.renderDateInput()}
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="line" />
          <div className="appointment-starred-button">
            <h4>Appointments</h4>
            <button
              type="button"
              className="starred-button"
              onClick={this.starredButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {finalAppointments.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                starClicked={this.starClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
