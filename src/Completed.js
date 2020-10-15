import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import Accordion from 'react-bootstrap/Accordion';

class Completed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showModal: false,
      courseRating: "No Rating",
    }
    this.rating = React.createRef();
  }

  render() {
    return (
      <Card style={{marginTop: '5px', marginBottom: '5px'}}>
        <Card.Body>
        <Card.Title>
            <div >
              {this.props.data.name}
            </div>
            {this.getExpansionButton()}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number} - {this.getCredits()}</Card.Subtitle>
          {this.getDescription()}
          <Form>
            <Form.Group controlId="ratings">
              <Form.Control as="select" ref={this.rating} onChange={() => this.setRating(this.rating.current.value)}>
                {this.getRatingOptions()}
              </Form.Control>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    )
  }

  setExpanded(value) {
    this.setState({expanded: value});
  }

  getExpansionButton() {
    let buttonText = '▼';
    let buttonOnClick = () => this.setExpanded(true);

    if(this.state.expanded) {
      buttonText = '▲';
      buttonOnClick = () => this.setExpanded(false)
    }

    return (
      <Button variant='outline-dark' style={{width: 25, height: 25, fontSize: 12, padding: 0, position: 'absolute', right: 20, top: 20}} onClick={buttonOnClick}>{buttonText}</Button>
    )
  }

  getRatingOptions() {
    let ratings = [<option key="No Rating">No Rating</option>];

    for (var i = 1; i <= 5; i++) {
      ratings.push(<option key={i}>{i}</option>)
    }

    return ratings;
  }

  setRating() {
    // add rated courses to this.props.ratedCourses(rated)
    let rated = {"number":this.props.data.number, "rating":this.rating.current.value};
    this.props.ratedCourse(rated);
  }
  
  getDescription() {
    if(this.state.expanded) {
      return (
        <div>
          <p>Subject: {this.props.data.subject}</p>
          <p>{this.props.data.description}</p>
          <p><strong>Requisites: </strong>
            {this.getRequisites()}
          </p>
          <p>Keywords: {this.props.data.keywords.toString()}</p>
        </div>
      )
    }
  }

  getRequisites() {
    let requisites = "";
    var reqData = this.props.data.requisites;

    if(reqData.length === 0) {
      requisites = <span>None</span>;
      return requisites;
    } else {
      for(var r = 0; r < reqData.length; r++){
        if(reqData[r].length === 0){
          break;
        }
        requisites += "(";
        for(var i = 0; i < reqData[r].length; i++){
          if(i+1 === reqData[r].length) {
            requisites += `${reqData[r][i]})`;
          } else {
            requisites += `${reqData[r][i]} OR `;
          }
        }
        
        if (r+1 === reqData.length) {
          break;
        } else {
          requisites += " AND ";
        }
      }      
    }
    return requisites;
  }

  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }
}

export default Completed;



