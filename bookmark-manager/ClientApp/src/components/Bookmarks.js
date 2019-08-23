import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Bookmarks';

class Bookmarks extends Component {
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        //this.ensureDataFetched();
    }

    ensureDataFetched() {
        //const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestBookmarks();
    }

    render() {
        return (
            <div>
                <h1>Bookmarks</h1>
                {renderBookmarksTable(this.props)}
                <p><Link to="/addbookmark"><button type="button" className="btn btn-primary">Add Bookmark</button></Link></p>
            </div>
        );
    }
}

function renderBookmarksTable(props) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Bookmark</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {props.bookmarks.map(bookmark =>
                    <tr key={bookmark.url}>
                        <td><img width="300" src={`api/bookmark/${bookmark.id}/screenshot`} /></td>
                        <td><a href={bookmark.url}>{bookmark.title}</a></td>
                        <td>{bookmark.shortDescription}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default connect(
    state => state.bookmarks,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Bookmarks);