import React, { PureComponent } from 'react';
import JSONEditor from 'jsoneditor';

class JsonEditor extends PureComponent {
  editorRef: any = null;
  editor: JSONEditor | null = null;

  initJsonEditor = () => {
    const options = {
      mode: 'view',
      history: true,
    };
    this.editor = new JSONEditor(this.editorRef, options);
  };

  handleMessage = (message, sender, sendResponse) => {
    console.log('panel received', message);
    const { cellData, cellView } = message.payload;
    this.editor.set({
      cellData,
      cellView,
    });
  }

  componentDidMount() {
    this.initJsonEditor();
    chrome.runtime.onMessage.addListener(this.handleMessage);
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }

    chrome.runtime.onMessage.removeListener(this.handleMessage);
  }

  setEditorRef = (ref) => {
    this.editorRef = ref;
  };

  render() {
    return <div className="editor-container" ref={this.setEditorRef} />;
  }
}
export default JsonEditor;
