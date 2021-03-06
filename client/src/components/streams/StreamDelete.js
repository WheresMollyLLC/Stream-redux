import React from "react";
import Modal from "../modal";
import { connect } from "react-redux";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id); //
  }

  onSubmit = (formValues) => {
    this.props.deleteStream(this.props.match.params.id, formValues);
  };

  renderActions() {
    return (
      <React.Fragment>
        <button onClick={this.onSubmit} className="ui button negative">
          Delete
        </button>
        <button onClick={() => history.push("/")} className="ui button ">
          Cancel
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
