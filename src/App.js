import React from "react";
import asteroid from './images/asteroid.png';
import earth from './images/earth.png';
import nasalogo from './images/nasa-logo.png';
import './App.css';

function compare( a, b ) {
  if ( a.average_lunar_distance < b.average_lunar_distance ){
    return -1;
  }
  if ( a.average_lunar_distance > b.average_lunar_distance ){
    return 1;
  }
  return 0;
}

function HoverObject(props){
  const { item, id} = props;
  return (
    <div className="Object" id={id}>
        <div className="image">
        <a href={item.url_nasa_details}>
          <img class='rotate'
            src={asteroid}
            height='35' 
            width='35'
            alt="picture of an asteroid" 
            onMouseOver={() => {
              document.getElementById("nasa-logo").style.visibility = "hidden";
              props.onHover(document.getElementsByClassName('info-box').innerHTML=(
                <div>
                <h1>Name: <strong>{item.fullname}</strong></h1>
                <ul>
                <i>
                  <li>Average Lunar Distance: {item.average_lunar_distance} or {item.average_lunar_distance*384317 + " km"}</li>
                  <li>Sentry ID: {item.sentryId}</li>
                  <li>Predicted to be nearest: {item.year_range_min + " - " + item.year_range_max}</li>
                  <li>{item.potential_impacts} Possible Potential Impacts</li>
                  <li>Impact Probability: {item.impact_probability}</li>
              <li>Velocity: {item.v_infinity + ' km/s'}</li>
                  <li>Absolute Magnitude: {item.absolute_magnitude}</li>
                  <li>Estimated Diameter: {item.estimated_diameter + ' km'}</li>
                  <li>Last Observed: {item.last_obs}</li>
                </i>
                <h3>Click to be directed to the NASA Center fo Near Earth Object Studies Page for this object</h3>
              </ul>
              </div>
              ))
            }}
            onMouseOut={() => {
            props.onHover('Hover over the asteroid you want to see more information about. Click the asteroid to be directed to NASA\'s website about the object.')
            document.getElementById("nasa-logo").style.visibility = "visible";
            }}
          />
          </a>
        </div>
    </div>
  );
  
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      objects: [],
      objectinfo: 'Hover over the asteroid you want to see more information about. Click the asteroid to be directed to NASA\'s website about the object.'
    };
  }
  async componentDidMount(){
    const url = "https://api.nasa.gov/neo/rest/v1/neo/sentry?is_active=true&page=0&size=30&api_key=IrN5Iyve4fiJfxQFchJkCow2zPtW9yGjPzcrgFlM"
    const response = await fetch(url);
    const data = await response.json();
    var sentry_objects = data.sentry_objects;
    this.setState({
      objects: sentry_objects.sort(compare).slice(0,10)
    })
  }
  render() {
    return (
      <div className="App"> 
      <div id='info-box'><p>{this.state.objectinfo}</p><img alt="NASA logo" id='nasa-logo' src={nasalogo}/></div>
      <div class='circle-container'>
        <img id='earth' alt="picture of Earth" src={earth}/>
        {this.state.objects.map((obj, index) => (
          <HoverObject key={obj} item={obj} id={'object' + (index + 1)} onHover={info => this.setState({ objectinfo: info })} />
        ))
        }
        </div>
      </div>
    );

  }
}
