// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {titleInput, dateInput, isStarred, id} = appointmentDetails
  const dateFormat = format(dateInput, 'dd MMMM yyyy,EEEE')

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const clickedOnStar = () => {
    const {starClicked} = props
    starClicked(id)
  }

  return (
    <li className="list-of-appointment" key={id}>
      <div className="title-star-container">
        <h1>{titleInput}</h1>
        <button
          type="button"
          data-testid="star"
          onClick={clickedOnStar}
          className="star-button"
        >
          <img src={starImage} alt="star" className="starredImage" />
        </button>
      </div>
      <p>Date:{dateFormat}</p>
    </li>
  )
}

export default AppointmentItem
