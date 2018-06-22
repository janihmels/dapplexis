import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// --------------------------------------------------------------
import cloudinaryURL from '../../system/cloudinary';
import { slotTimes, months } from '../../system/constants';
// --------------------------------------------------------------
import './css/picker.css';
import './css/home.css';
// --------------------------------------------------------------
import avatar from '../../css/assets/coach_avatar.jpg';

// --------------------------------------------------------------
// --------------------------------------------------------------
class HomeStage extends Component {

  // --------------------------------------------------------------
  moveToSchedule = () => {
    this.props.history.push('/schedule');
  }
  // --------------------------------------------------------------
  onLessonStart = () => {
    this.props.history.push('/lesson/');
  }
  // --------------------------------------------------------------
  onSchedule = () => {
    this.props.history.push('/schedule/');
  }
  // --------------------------------------------------------------
  onLessons = () => {
    this.props.history.push('/lessons/');
  }

  // --------------------------------------------------------------
  render() {

    const { learner } = this.props.authenticate;
    const { mode, lesson } = this.props.lesson;
    const { Translate } = this.props.localizer;
    const tr = new Translate('home');

    return (
      <div className="home-center-stage">
        <div className="home-back">
          <h1 className="headline">{tr.do('hi')} {learner.current.first} & {learner.parent.first}!</h1>
          <h3 className="next-lesson">{tr.do('upcoming')}</h3>

                  {
                    mode.upcoming ?
                    (
                      <div className="upcoming-lesson exists">
                          <div className="picker upcoming coach">
                            <span className="pick-profile">
                              <img src={cloudinaryURL(lesson.coach.pic)} />
                            </span>
                            <div className="date">{months[lesson.when.month-1]} {lesson.when.day}, {lesson.when.year}</div>
                            <div className="time">{slotTimes(lesson.when.timeslot)}</div>
                            <div className="coach">{lesson.coach.display}</div>
                            <span className="pick-response-start">
                              <button style={{display:'none'}}
                                className="btn-picker lesson-set"
                                onClick={this.moveToLesson}
                              >08:33</button>
                            </span>
                          </div>
                        </div>

                    ) : (
                      <div className="upcoming-lesson none">
                        <h3>{tr.do('none')}</h3>
                        <button
                          className="btn-lesson-picker"
                          onClick={this.moveToSchedule}
                        >{tr.do('schedule')}</button>
                      </div>

                    )
                  }
        </div>
      </div>
    )
  }
}

// --------------------------------------------------------------
// --------------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators({},dispatch);
}
function mapStateToProps(state) {
  return {
    lesson: state.lesson,
    authenticate: state.authenticate,
    localizer: state.localizer
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeStage);
