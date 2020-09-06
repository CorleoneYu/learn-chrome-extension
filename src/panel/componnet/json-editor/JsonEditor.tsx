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

    const json = {
      Array: [1, 2, 3],
      Boolean: true,
      Null: null,
      Number: 123,
      Object: { a: 'b', c: 'd' },
      String: 'Hello World',
    };

    console.log('editorRef', this.editorRef);
    this.editor = new JSONEditor(this.editorRef, options);
    this.editor.set(json);
  };

  componentDidMount() {
    this.initJsonEditor();
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  setEditorRef = (ref) => {
    console.log('ref', ref);
    this.editorRef = ref;
  };

  render() {
    return (
      <div>
        <h1>editor</h1>
        <div className="editor-container" ref={this.setEditorRef} />
      </div>
    );
  }
}
export default JsonEditor;
