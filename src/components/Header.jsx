import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <div>
        <img data-testid="header-profile-picture" src="" alt="" />
        <span data-testid="header-player-name"></span>
        <span data-testid="header-score"></span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.name,
});

export default connect()(Header);
