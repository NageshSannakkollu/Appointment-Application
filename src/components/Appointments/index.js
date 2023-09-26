// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {titleInput: '', dateInput: '', appointmentList: []}

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
    const {appointmentList} = this.state
    console.log(appointmentList)
    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="appointment-heading">Add Appointment</h1>
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="inputs-container">
              {this.renderTitleInput()}
              {this.renderDateInput()}
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </form>
          <hr className="line" />
          <div className="appointment-starred-button">
            <p>Appointments</p>
            <button
              type="button"
              className="starred-button"
              onClick={this.starredButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {appointmentList.map(eachAppointment => (
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
