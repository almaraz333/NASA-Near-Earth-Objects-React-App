import React from "react";
import asteroid from './images/asteroid.png';
import earth from './images/earth.png';

function HoverObject(props){
    const [hovering, setHovering] = React.useState(false);
    const { item, id} = props;
    return (
      <div className="Object" id={id}>
          <strong>{item.fullname}</strong>
          {/* <li><a href={item.url_nasa_details}> NASA Center fo Near Earth Object Studies Link to Object </a></li> */}
          <div className="image">
            <img class='rotate'
              src={asteroid}
              height='35' 
              width='35'
              alt="picture of asteroid"
              onMouseOver={() => setHovering(true)}
              onMouseOut={() => setHovering(false)}
            />
          </div>
        {hovering && <div className={'info-' + id}>
        <ul>
          <i>
            <li>Average Lunar Distance: {item.average_lunar_distance} or {item.average_lunar_distance*384317+" km"}</li>
            <li>Sentry ID: {item.sentryId}</li>
            <li>Predicted to be nearest: {item.year_range_min + " - " + item.year_range_max}</li>
            <li>{item.potential_impacts} Possible Potential Impacts </li>
            <li>Impact Probability: {item.impact_probability}</li>
            <li>Absolute Magnitude: {item.absolute_magnitude}</li>
            <li>Estimated Diameter: {item.estimated_diameter}</li>
            <li>Last Observed: {item.last_obs}</li>
          </i>
        </ul>
          </div>}
      </div>
    );
    
  }

  export default HoverObject;