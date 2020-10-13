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
      courseRating: 0,
    }
    this.rating = React.createRef();
  }

  render() {
    return (
      <Card style={{width: '33%', marginTop: '5px', marginBottom: '5px'}}>
        <Card.Body>
          <Card.Title>
            <div style={{maxWidth: 250}}>
              {this.props.data.name}
            </div>
            {this.getExpansionButton()}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number} - {this.getCredits()}</Card.Subtitle>
          {this.getDescription()}
          <Form>
            <Form.Group controlId="ratings">
              <Form.Control as="select" ref={this.rating} onClick={() => this.setRating()}>
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
    this.setState({courseRating: this.rating});
  }
  
  getDescription() {
    if(this.state.expanded) {
      return (
        <div>
          {this.props.data.description}
        </div>
      )
    }
  }

  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }
}

export default Completed;



