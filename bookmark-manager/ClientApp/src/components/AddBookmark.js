import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { actionCreators } from '../store/Bookmarks';
import axios from 'axios';

export class AddBookmark extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            'titleInput': '',
            'urlInput': '',
            'shortDescriptionInput': '',
            'redirectToBookmarks': false
        };
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target);

        if (this.state.urlInput === '' || this.state.titleInput === '' || this.shortDescriptionInput === '')
            return;

        axios.post('api/bookmark',
            {
                'url': this.state.urlInput,
                'title': this.state.titleInput,
                'shortDescription': this.state.shortDescriptionInput
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({ redirectToBookmarks: true });
            });
    }

    render() {
        const redirectToBookmarks = this.state.redirectToBookmarks;
        if (redirectToBookmarks === true) {
            return <Redirect to="/bookmarks" />;
        }
        return (
            <div>
                <h1>Add Bookmark</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titleInput">Title</label>
                        <input className="form-control" id="titleInput" placeholder="Title of page" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="urlInput">URL</label>
                        <input className="form-control" id="urlInput" placeholder="Enter the url" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shortDescriptionInput">Short Description</label>
                        <input className="form-control" id="shortDescriptionInput" placeholder="Enter a short description" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

