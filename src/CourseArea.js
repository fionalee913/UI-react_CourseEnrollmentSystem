import React from 'react';
import './App.css';
import Course from './Course';
import Completed from './Completed';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];
    let completed = this.props.completed;
    console.log(completed);

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
        <Completed key={i} data={this.props.data[i]} courseKey={this.props.data[i].number} addCartCourse={(data) => this.props.addCartCourse(data)} removeCartCourse={(data) => this.props.removeCartCourse(data)} cartCourses={this.props.cartCourses}/>
      )
    }
  }
  else{
    for(const complete of Object.keys(this.props.data)){
      completed.push (
        <Completed key={this.props.data[complete].number} data={this.props.data[complete]} courseKey={this.props.data[complete].number} addCartCourse={(data) => this.props.addCartCourse(data)} removeCartCourse={(data) => this.props.removeCartCourse(data)} cartCourses={this.props.cartCourses}/>
      )
    }
  }

    return completed;
  }

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props) !== JSON.stringify(nextProps))
  }

  render() {
    return (
      <div style={{margin: 5, marginTop: -5}}>
        {this.getCourses()}
      </div>
    )
  }
}

export default CourseArea;
