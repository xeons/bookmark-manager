import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import Bookmarks from './components/Bookmarks';
import { AddBookmark } from './components/AddBookmark';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/bookmarks' component={Bookmarks} />
    <Route path='/addbookmark' component={AddBookmark} />
  </Layout>
);
