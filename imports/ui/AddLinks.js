import React from 'react';
import Model from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLinks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onModelClose() {
        this.setState({isOpen: false, url: '', error: ''});
    }

    onSubmit(e) {
        const { url } = this.state;

        e.preventDefault();

        Meteor.call('links.create', url, (err, res) => {
            if (!err) {
                this.setState({isOpen: false, url: '', error: ''});
            } else {
                this.setState({error: err.reason});
            }
        });
    }
    onChange(e) {
        this.setState({
            url: e.target.value
        });
    }
    render() {
        return (
<div>
    <button
    onClick={ () => this.setState({isOpen: true}) }
    className="button">+ Add Link</button>
    <Model
    className="boxed-view__box"
    overlayClassName="boxed-view boxed-view--model"
    isOpen={this.state.isOpen}
    contentLabel="Add Link"
    ariaHideApp={false}
    onAfterOpen={() => this.refs.url.focus()}
    onRequestClose={this.onModelClose.bind(this)}>
        <h3>Add New Link</h3>
        { this.state.error ? <p>{this.state.error}</p> : undefined }
        <form
        className="boxed-view__form"
        onSubmit={this.onSubmit.bind(this)}>
            <input
            type="text"
            placeholder="URL"
            ref="url"
            value={this.state.url}
            onChange={this.onChange.bind(this)}/>
            <button
            className="button">Add Link</button>
            <button
            type="button"
            className="button button--secondary"
            onClick={this.onModelClose.bind(this)}>Cancel</button>
        </form>
    </Model>
</div>
        )
    }
}