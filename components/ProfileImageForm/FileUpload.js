import React, { Component, PropTypes } from 'react';

export default class FileUpload extends Component {
  static propTypes = {
    id: PropTypes.string,
    handleFileChange: PropTypes.func,
    handleDragEnter: PropTypes.func,
    handleDragLeave: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.onDragEnterHandler = this.onDragEnterHandler.bind(this);
    this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this);
  }

  onDragEnterHandler() {
    this.props.handleDragEnter();
  }

  onDragLeaveHandler() {
    this.props.handleDragLeave();
  }

  onFileLoad(img) {
    const inFile = this.inFile;
    inFile.value = '';
    this.props.handleFileChange(img.target.result);
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file || file.type.indexOf('image/') === -1) return;

    reader.onload = this.onFileLoad;
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <input
        id={this.props.id}
        ref={(inFile) => {
          this.inFile = inFile;
        }}
        type="file"
        accept="image/*"
        onChange={this.handleFile}
        onDragEnter={this.onDragEnterHandler}
        onDragLeave={this.onDragLeaveHandler}
      />
    );
  }
}
