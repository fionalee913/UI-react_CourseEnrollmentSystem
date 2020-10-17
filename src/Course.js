import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showModal: false,
      showAlert: false,
      removeAlert: false,
      requisitePath: []
    }
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
          <Button variant='dark' style={{float: "right"}} onClick={() => this.openModal()}>View sections</Button>
        </Card.Body>
        <Modal show={this.state.showModal} onHide={() => this.closeModal()} centered size="lg" >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.data.name}</Modal.Title>
          </Modal.Header>
          <Alert show={this.state.showAlert} variant="danger">
            <Alert.Heading>You are not able to enroll this course!</Alert.Heading>
            <p>You are not able to enroll this course because you have not met the following requsites of this course: </p>
            {this.getRequisites(this.state.requisitePath)}
            <div className="d-flex justify-content-end">
                <Button onClick={() => this.setState({showAlert: false})} variant="outline-danger">
                  Got it!
                </Button>
            </div>
          </Alert>
          <Modal.Body>
            {this.getSections()}
          </Modal.Body>
          <Modal.Footer>
            {this.getCourseButton()}
            <Button variant="secondary" onClick={() => this.closeModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.removeAlert} onHide={() => this.closeAlert()}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.data.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to remove this course from your cart?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.removeCourse()}>
              Yes
            </Button>
            <Button variant="secondary" onClick={() => this.closeAlert()}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    )
  }

  getCourseButton() {
    let buttonVariant = 'dark';
    let buttonOnClick = () => this.addCourse();
    let buttonText = 'Add Course';

    if(this.props.courseKey in this.props.cartCourses) {
      buttonVariant = 'outline-dark';
      buttonOnClick = () => {this.setState({removeAlert: true})};
      buttonText = 'Remove Course'
    }

    return (
      <Button variant={buttonVariant} onClick={buttonOnClick}>
        {buttonText}
      </Button>
    )
  }

  getTimes(timeData) {
		let meetingTime = [];
		Object.keys(timeData).map(times => {
			meetingTime.push(
				<li key={times}>{times}: {timeData[times]}</li>
			)
		});
		return meetingTime;
	}

  getSections() {
    let sections = [];

    for (let i =0; i < this.props.data.sections.length; i++){
      sections.push (
          <Card key={i}>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey={i} style={{height: 63, display: 'flex', alignItems: 'center'}}>
              {this.props.data.sections[i].number}
              {this.getSectionButton(i)}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i}>
              <Card.Body>
              <ul>
              	<li>Instructor: {this.props.data.sections[i].instructor}</li>
              	<li>Location: {this.props.data.sections[i].location}</li>
              	<li>Meeting Times</li>
                <ul>
                  {this.getTimes(this.props.data.sections[i].time)}
                </ul>
              </ul>
              {this.getSubsections(i, this.props.data.sections[i])}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
      )
    }

    return (
      <Accordion defaultActiveKey="0">
        {sections}
      </Accordion>
    )
  }

  getSectionButton(section) {
    let buttonVariant = 'dark';
    let buttonOnClick = (e) => this.addSection(e, section);
    let buttonText = 'Add Section';

    if(this.props.courseKey in this.props.cartCourses) {
      if(section in this.props.cartCourses[this.props.courseKey]) {
        buttonVariant = 'outline-dark';
        buttonOnClick = (e) => this.removeSection(e, section);
        buttonText = 'Remove Section';
      }
    }

    return <Button variant={buttonVariant} onClick={buttonOnClick} style={{position: 'absolute', right: 20}}>{buttonText}</Button>
  }

  checkRequisites() {
    let completed = this.props.completedCourses;
    let unmet = [];
    console.log(this.props.completedCourses);
    let allMeet = true;
    for (const requisite of this.props.data.requisites) {
      let meet = false;
      for (const complete of completed) {
        if (requisite.includes(complete)) {
          meet = true;
          break;
        }
      }
      if (!meet) {
        unmet.push(requisite);
        allMeet = false;
      }
    }

    if (!allMeet) {
      this.setState({requisitePath: unmet});
      this.setState({showAlert: true});
    }
  }

  addCourse() {
    this.checkRequisites();
    this.props.addCartCourse (
      {
        course: this.props.courseKey
      }
    );
  }

  removeCourse() {
    
    this.props.removeCartCourse (
      {
        course: this.props.courseKey
      }
    );
  }

  addSection(e, section) {
    e.stopPropagation();
    this.checkRequisites();
    this.props.addCartCourse (
      {
        course: this.props.courseKey,
        section: section
      }
    );
  }

  removeSection(e, section) {
    e.stopPropagation();
    this.props.removeCartCourse (
      {
        course: this.props.courseKey,
        section: section
      }
    );
  }

  addSubsection(e, section, subsection) {
    e.stopPropagation();
    this.checkRequisites();
    this.props.addCartCourse (
      {
        course: this.props.courseKey,
        section: section,
        subsection: subsection
      }
    );
  }

  removeSubsection(e, section, subsection) {
    e.stopPropagation();
    this.props.removeCartCourse (
      {
        course: this.props.courseKey,
        section: section,
        subsection: subsection
      }
    );

  }

  getSubsections(sectionKey, sectionValue) {
    let subsections = [];

    for (let i =0; i < sectionValue.subsections.length; i++){  
    subsections.push (
        <Card key={i}>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={i} style={{height: 63, display: 'flex', alignItems: 'center'}}>
            {sectionValue.subsections[i].number}
            {this.getSubsectionButton(sectionKey, i)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i}>
            <Card.Body>
              <ul>
                <li>Location: {sectionValue.subsections[i].location}</li>
              	<li>Meeting Times</li>
						    <ul>
							    {this.getTimes(sectionValue.subsections[i].time)}
            	  </ul>
            	</ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    }

    return (
      <Accordion defaultActiveKey="0">
        {subsections}
      </Accordion>
    )
  }

  getSubsectionButton(section, subsection) {
    let buttonVariant = 'dark';
    let buttonOnClick = (e) => this.addSubsection(e, section, subsection);
    let buttonText = 'Add Subsection';

    if(this.props.courseKey in this.props.cartCourses) {
      if(section in this.props.cartCourses[this.props.courseKey]) {
        if(this.props.cartCourses[this.props.courseKey][section].indexOf(subsection) > -1) {
          buttonVariant = 'outline-dark';
          buttonOnClick = (e) => this.removeSubsection(e, section, subsection);
          buttonText = 'Remove Subsection';
        }
      }
    }

    return <Button variant={buttonVariant} onClick={buttonOnClick} style={{position: 'absolute', right: 20}}>{buttonText}</Button>
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  openAlert() {
    this.setState({removeAlert: true});
  }

  closeAlert() {
    this.setState({removeAlert: false});
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

  getDescription() {
    if(this.state.expanded) {
      return (
        <div>
          <p>Subject: {this.props.data.subject}</p>
          <p>{this.props.data.description}</p>
          <p><strong>Requisites: </strong>
            {this.getRequisites(this.props.data.requisites)}
          </p>
          <p>Keywords: {this.props.data.keywords.toString()}</p>
        </div>
      )
    }
  }

  getRequisites(reqData) {
    let requisites = "";
    //var reqData = this.props.data.requisites;

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

export default Course;
