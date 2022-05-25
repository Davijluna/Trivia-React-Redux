import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const convertedEmail = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({ hash: url });
  }

  render() {
    const { hash } = this.state;
    const { name, score } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ hash } alt="User" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">
          { score }
        </p>
      </div>
      // <div>
      //   <img
      //     data-testid="header-profile-picture"
      //     src={ ` https://www.gravatar.com/avatar/${image}` }
      //     alt="avatar"
      //   />
      //   <div data-testid="header-player-name">
      //     { name }
      //   </div>
      //   <p data-testid="header-score">
      //     { score }
      //   </p>
      // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,

};
