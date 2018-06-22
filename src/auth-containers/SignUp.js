import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { callNapi } from '../system/system';
// --------------------------------------------------------------
import './css/auth.css';
import tutoria from './assets/tutoria_medium.png';
// --------------------------------------------------------------
import Translate from "./i18n/loc_strings";
const tr = new Translate('signup');

// --------------------------------------------------------------
// --------------------------------------------------------------
class LearnerSignUp extends Component {

  // --------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = { connecting: false }
  }

  // --------------------------------------------------------------
  logIn = () => {
    this.props.history.push('/login');
  }

  // --------------------------------------------------------------
  renderField = (field) => {
    return (
        <td>
          <input
            className="form-control"
            {...field.input}
            type={field.type}
            placeholder = {field.label}
          />
          <div className="error">
            { field.meta.touched ? field.meta.error : '' }
          </div>
      </td>
    );
  }

  // --------------------------------------------------------------
  renderPicker = (field) => {
    console.log("Picker", field);
    return (
      <td>
        <select {...field.input}>{field.children}</select>
        <div className = "error">
          { field.meta.touched ? field.meta.error : '' }
        </div>
      </td>
    );
  }

  // --------------------------------------------------------------
  onSubmit = (values) => {
      this.setState({connecting:true});
      callNapi('users','setupLearner',values).then(
        (response) => {
          console.log("Signup response", response);
          if(response.data.data.error) {
            alert(response.data.data.error.message);
            this.setState({connecting:false});
          } else {
            localStorage.setItem('learnerid',response.data.data.id);
            window.location.href='./home';
          }
      });
  }

  // --------------------------------------------------------------
  render() {

    const { handleSubmit } = this.props;
    return (

      <div className='formBox'>
        <h3>{tr.do('signup')}</h3>
        <div className='innerBox'>
          <img className="login" src={tutoria} />
          <form onSubmit={handleSubmit(this.onSubmit)}>
          <table className="auth">
            <thead></thead>
            <tbody>
              <tr><td colSpan="3" className="category">{tr.do('parent')}</td></tr>
              <tr>
                <td className="entry">{tr.do('name')}</td>
                <Field
                  name="first"
                  component={this.renderField}
                  label={tr.do('first')}
                  type="text"
                />
                <Field
                  name="last"
                  component={this.renderField}
                  label={tr.do('last')}
                  type="text"
                />
              </tr>
              <tr>
                <td className="entry">{tr.do('contact')}</td>
                <Field
                  name="email"
                  component={this.renderField}
                  label={tr.do('email')}
                  type="email"
                />
                <Field
                  name="phone"
                  component={this.renderField}
                  label={tr.do('mobile')}
                  type="text"
                />
              </tr>

              <tr>
                <td className="entry">{tr.do('password')}</td>
                <Field
                  name="password"
                  component={this.renderField}
                  label={tr.do('password')}
                  type="password"
                />
                <Field
                  name="repeatPassword"
                  component={this.renderField}
                  label={tr.do('repeat_password')}
                  type="password"
                />
              </tr>

              <tr><td colSpan="3"><hr /></td></tr>
              <tr><td colSpan="3" className="category">{tr.do('child')}</td></tr>
              <tr>
                <td className="entry">{tr.do('name')}</td>
                <Field
                  name="childfirst"
                  component={this.renderField}
                  label={tr.do('first_name')}
                  type="text"
                />
                <td></td>
              </tr>

              <tr>
                <td className="entry">{tr.do('path')}</td>
                <Field name="course" component={this.renderPicker}>
                  <option value={null} />
                  <option value="summer-fun">Summer Fun</option>
                </Field>
                <td></td>
              </tr>

              <tr><td colSpan="2"><hr /></td><td></td></tr>

              </tbody>
              </table>

              <button type="submit" className="auth-link">
              { this.state.connecting ? tr.do('connecting') : tr.do('log_in') }
              </button>
          </form>
        </div>

        <div className="cross-link">
          {tr.do('have_account')} <a onClick={this.logIn}>{tr.do('log_in')}</a>
        </div>

      </div>

    );
  }
}

function validate(values) {
  const errors={};
  if(!values.first) errors.first='Please enter your first name';
  if(!values.last) errors.last='Please enter your first name';
  if(!values.email) errors.email='Please enter a valid email address';
  if(!values.phone) errors.phone='Please enter your mobile phone number';
  if(!values.childFirst) errors.childFirst='Please enter your child\'s name';
  if(!values.course) errors.course='Please choose a curriculum';

  if(values.password) {
    if(values.password.length<6) errors.password='Please enter at least 6 characters';
  } else {
    errors.password='Please enter your password';
  }

  if(values.password!==values.repeatPassword) errors.repeatPassword='Repeated password does not match.';
  if(!values.repeatPassword) errors.repeatPassword='Please repeat your password';

  return errors;
}

export default reduxForm({
  validate,
  form:'Learner',
  fields: ['first','last','email','phone','password','repeatPassword','childfirst','course']
})(LearnerSignUp);
