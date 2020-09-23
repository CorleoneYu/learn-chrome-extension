import React, { PureComponent } from 'react';
import JSONEditor from 'jsoneditor';

export interface IJsonEditorProps {
    data: any;
}

class JsonEditor extends PureComponent<IJsonEditorProps> {
    editorRef: any = null;
    editor: JSONEditor | null = null;

    componentDidUpdate(prevProps: IJsonEditorProps) {
        const { data } = this.props;
        if (data !== prevProps.data) {
            this.editor.set(data);
        }
    }

    initJsonEditor = () => {
        const options = {
            mode: 'view',
            history: true,
        };
        this.editor = new JSONEditor(this.editorRef, options);
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
        this.editorRef = ref;
    };

    render() {
        return <div className="editor-container" ref={this.setEditorRef} />;
    }
}
export default JsonEditor;
