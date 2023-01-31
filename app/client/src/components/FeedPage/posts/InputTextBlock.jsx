/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, {
    useCallback,
    useMemo,
    useState,
    useRef,
    useEffect,
} from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate, ReactEditor } from 'slate-react';
import { Editor, Transforms, createEditor, Node, Value } from 'slate';
import { withHistory } from 'slate-history';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Element, Leaf, toggleMark, Toolbar } from './inputComponents';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

let initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];

// rich text input component
const InputTextBlock = ({ onChange, mt, initial }) => {
    if (initial !== '') {
        initialValue = JSON.parse(initial);
    }

    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        // console.log(value);
    }, [value]);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    // focus selection
    const [focused, setFocused] = React.useState(false);
    const savedSelection = React.useRef(editor.selection);

    const onFocus = React.useCallback(() => {
        setFocused(true);
        if (!editor.selection && value?.length) {
            Transforms.select(
                editor,
                savedSelection.current ?? Editor.end(editor, [])
            );
        }
    }, [editor]);

    const onBlur = React.useCallback(() => {
        setFocused(false);
        savedSelection.current = editor.selection;
    }, [editor]);

    // const divRef = React.useRef < HTMLDivElement > null;

    // const focusEditor = React.useCallback(
    //     e => {
    //         if (e.target === divRef.current) {
    //             ReactEditor.focus(editor);
    //             e.preventDefault();
    //         }
    //     },
    //     [editor]
    // );

    const onKeyDown = event => {
        // eslint-disable-next-line no-restricted-syntax
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
            }
        }
    };
    return (
        <Box
            /* ref={divRef} */ /* onMouseDown={focusEditor} */ borderWidth="1px"
            mt={mt}
        >
            <Slate
                editor={editor}
                value={value}
                onChange={newValue => {
                    // console.log(newValue);
                    setValue(newValue);
                    onChange(JSON.stringify(newValue));
                }}
            >
                <Toolbar />
                <Box padding="15px 5px">
                    <Editable
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Write a post..."
                        spellCheck
                        style={{
                            minHeight: '150px',
                            resize: 'vertical',
                            overflow: 'auto',
                        }}
                    />
                </Box>
            </Slate>
        </Box>
    );
};

InputTextBlock.propTypes = {
    onChange: PropTypes.func.isRequired,
    mt: PropTypes.string,
    initial: PropTypes.string,
};

InputTextBlock.defaultProps = {
    mt: '0px',
    initial: '',
};

export default InputTextBlock;
