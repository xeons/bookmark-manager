import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
  <div>
        <h1>Bookmark Manager</h1>
    <p>Welcome to the worlds greatest bookmark manager!</p>
    </div>
);

export default connect()(Home);
