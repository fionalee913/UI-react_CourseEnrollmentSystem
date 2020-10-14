import React from 'react';
import './App.css';
import Course from './Course';
import Completed from './Completed';
import Recommended from './Recommended';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    if (Array.isArray(this.props.data)){
        for(let i =0; i < this.props.data.length; i++){
          courses.push (
              <Course key={i} data={this.props.data[i]} completed={this.props.completed} courseKey={this.props.data[i].number} addCartCourse={(data) => this.props.addCartCourse(data)} removeCartCourse={(data) => this.props.removeCartCourse(data)} cartCourses={this.props.cartCourses}/>
          )
        }
    }
  else{
    for(const course of Object.keys(this.props.data)){
      courses.push (
        <Course key={this.props.data[course].number} data={this.props.data[course]} completed={this.props.completed} courseKey={this.props.data[course].number} addCartCourse={(data) => this.props.addCartCourse(data)} removeCartCourse={(data) => this.props.removeCartCourse(data)} cartCourses={this.props.cartCourses}/>
      )
    }
  }

    return courses;
  }

  getCompleted() {
    let completed = [];

    if (Array.isArray(this.props.data)){
     for(let i =0; i < this.props.data.length; i++){
      completed.push (
        <Completed key={i} data={this.props.data[i]} courseKey={this.props.data[i].number} ratedCourse={(rated) => this.props.ratedCourses(rated)}/>
      )
    }
  }
  else{
    for(const complete of Object.keys(this.props.data)){
      completed.push (
        <Completed key={this.props.data[complete].number} data={this.props.data[complete]} ratedCourse={(rated) => this.props.ratedCourses(rated)}/>
      )
    }
  }

    return completed;
  }

  getRecommendedCourses() {
    // get rated courses: this.props.ratedCourses
    // for courses in all courses, choose those imcompleted with same interest area as rated courses
    let allCourses = this.props.allCourses;
    let completedCourses = this.props.completedCourses;
    let rated = this.props.data;
    let recCourses = [];
    let ratedCourses = [];
    let interestArea = [];

    console.log(this.props.data);
    // extract interest areas
    for (const r of rated) {
      console.log(r);
      if (r.rating >= 3) {
        ratedCourses.push(completedCourses.find(course => {return course.number === r.number}));
      }
    }
    console.log(ratedCourses);
    for (const course of ratedCourses) {
      if (!interestArea.includes(course.subject.toLowerCase())) {
        interestArea.push(course.subject.toLowerCase());
      }
      for (const keyword of course.keywords) {
        if (!interestArea.includes(keyword.toLowerCase())) {
          interestArea.push(keyword.toLowerCase());
        }
      }
    }
    console.log(interestArea);

    // incompleted courses in same areas
    allCourses = allCourses.filter(c => !completedCourses.includes(c));
    for (const rec of allCourses) {
      if (interestArea.includes(rec.subject.toLowerCase())) {
        recCourses.push(rec);
      } else {
        for (const keyword of rec.keywords) {
          if (interestArea.includes(keyword.toLowerCase())) {
            recCourses.push(rec);
            break;
          }
        }
      }
    }
    
    console.log(recCourses);
    return recCourses;
  }

  getRecommended() {
    let recCourses = this.getRecommendedCourses();
    console.log(recCourses);
    let recommendedCourses = [];

    for (const course of recCourses) {
      recommendedCourses.push(<Recommended key={course.number} data={course}/>);
    }

    return recommendedCourses;
    
  }

  showElement() {
    if (this.props.mode === "courses" || this.props.mode === "cart") {
      return this.getCourses();
    } else if (this.props.mode === "completed") {
      console.log("completed");
      return this.getCompleted();
    } else {
      console.log("recommended");
      return this.getRecommended();
    }
  }

  /*shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props) !== JSON.stringify(nextProps))
  }*/

  render() {
    return (
      <div style={{margin: 5, marginTop: -5}}>
        {this.showElement()}
      </div>
    )
  }
}

export default CourseArea;
