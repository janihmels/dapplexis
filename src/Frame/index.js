import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// -------------------------------------------------------------
import * as nebulas from '../nebulas/';
// --------------------------------------------------------------
import { signIn } from '../redux/store/actions';
// --------------------------------------------------------------
import "./css/frame.css";
import bars from "./media/bars.gif";

class Frame extends Component {
  
  render() {
    
    const { history, location, store: { user, loadstatus } } = this.props;
    const loc = { history, location };
    
    return (
      <div className="main">
        <Header 
          loc={loc} 
          user={user}
          loadstatus={loadstatus}
        />
        <div className="clear"></div>
        {this.props.children}
      </div>
    )
  }
}
// --------------------------------------------------------------
// --------------------------------------------------------------
class Header extends Component {

  unregister = () => {
    nebulas.unregister( () => {
      window.location.href="/.";
    });
  }
  // --------------------------------------------------------------
  render() {
    const { loc, user, loadstatus } = this.props;
    return (
          <div className="header">
            <i className="icon ion-cube logo" aria-hidden="true"></i>
            <div className="text logo">DApp Lexis</div>
            <Navigator loc={loc} />
            {
              loadstatus ?   
              ( 
                <div>
                  <div className="load-bars"><img src={bars} /></div>
                  <div className="load-status">{loadstatus}</div>
                </div>
              ) : ''
            }
            <div className="user">Hi {user.nick} | <a onClick={this.unregister}>Unregister</a></div>
          </div>
    );
  }
}

// --------------------------------------------------------------
// --------------------------------------------------------------
class Navigator extends Component {
  
  onNavigate = (target) => {
    this.props.loc.history.push(target);
  }

  render() {
    const pages=[ {
        headline: 'My Projects',
        target: '/my'
      }, {
        headline: 'Community Projects',
        target: '/community'
      }
    ];
    const currentpath = this.props.loc.location.pathname;
    return (
      <div className="navigate">
        {
          pages.map( 
            (page, pageindex) => 
            <PageEntry 
              key={`navigate-${pageindex}`} 
              page={page}
              currentpath={currentpath}
              onNavigate={this.onNavigate}
            />
          )
        }
        
      </div>    
    )
  }
}

// --------------------------------------------------------------
// --------------------------------------------------------------
class PageEntry extends Component {
  onClick = () => {
    this.props.onNavigate(this.props.page.target);
  }

  render() {
    const { page, currentpath } = this.props;
    const activeClass = (page.target === currentpath) ? 'active' : '';
    return (
      <a 
        className={activeClass} 
        onClick={this.onClick}
      >
        {this.props.page.headline}
      </a>
    )
  }
}

// --------------------------------------------------------------
// --------------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn },dispatch);
}
function mapStateToProps(state) {
  return {
    store: state.store
  };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Frame));