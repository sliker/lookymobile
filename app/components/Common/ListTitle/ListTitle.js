import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextRoboto from '../TextRoboto/TextRoboto';

import styles from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
};

class ListTitle extends Component {
  render() {
    return (
      <TextRoboto style={styles.title}>
        { this.props.title }
      </TextRoboto>
    );
  }
}

ListTitle.propTypes = propTypes;

export default ListTitle;
