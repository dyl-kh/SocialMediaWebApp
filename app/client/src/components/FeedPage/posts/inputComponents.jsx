/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import {
    IconButton,
    HStack,
    useColorMode,
    chakra,
    ListItem,
    OrderedList,
    UnorderedList,
    Heading,
} from '@chakra-ui/react';

import React, { ReactElement } from 'react';
import {
    MdCode,
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote,
    MdFormatUnderlined,
    MdLooksOne,
    MdLooksTwo,
} from 'react-icons/md';
import {
    useSlate,
    ReactEditor,
    RenderLeafProps,
    RenderElementProps,
} from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { HistoryEditor } from 'slate-history';
import PropTypes from 'prop-types';
// components for rich text editor
export const Element = props => {
    const { attributes, children, element } = props;
    switch (element.type) {
        case 'block-quote':
            return (
                <chakra.blockquote
                    borderLeftWidth="10px"
                    borderLeftColor="gray.200"
                    {...attributes}
                >
                    {children}
                </chakra.blockquote>
            );
        case 'list-item':
            return <ListItem {...attributes}>{children}</ListItem>;
        case 'numbered-list':
            return <OrderedList {...attributes}>{children}</OrderedList>;
        case 'bulleted-list':
            return <UnorderedList {...attributes}>{children}</UnorderedList>;
        case 'heading-one':
            return (
                <Heading as="h1" size="3xl" {...attributes}>
                    {children}
                </Heading>
            );
        case 'heading-two':
            return (
                <Heading as="h2" size="2xl" {...attributes}>
                    {children}
                </Heading>
            );
        default:
            return <p {...attributes}>{children}</p>;
    }
};

export const Leaf = props => {
    const { attributes, leaf } = props;
    let { children } = props;
    const { colorMode, toggleColorMode } = useColorMode();

    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = (
            <chakra.code
                padding="3px"
                backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                fontSize="90%"
            >
                {children}
            </chakra.code>
        );
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    // console.log(children);
    return <span {...attributes}>{children}</span>;
};

const isBlockActive = (editor, format) => {
    const nodeGen = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === format,
    });

    const node = nodeGen.next();
    // eslint-disable-next-line no-unreachable-loop
    while (!node.done) {
        return true;
    }
    return false;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const EditorProps = Editor || ReactEditor || HistoryEditor;
const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n =>
            LIST_TYPES.includes(
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
            ),
        split: true,
    });

    const newProperties = {
        // eslint-disable-next-line no-nested-ternary
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <IconButton
            variant="outline"
            colorScheme="blue"
            isActive={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
            aria-label={format}
            icon={icon}
            borderWidth={0}
            fontSize="20px"
        />
    );
};

MarkButton.propTypes = {
    format: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
};

export const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <IconButton
            variant="outline"
            colorScheme="blue"
            isActive={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
            aria-label={format}
            icon={icon}
            borderWidth={0}
            fontSize="20px"
        />
    );
};

BlockButton.propTypes = {
    format: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
};

export const Toolbar = () => {
    return (
        <HStack
            borderWidth="0 0 1px 0"
            padding="10px 5px"
            spacing="5px"
            wrap="wrap"
        >
            <MarkButton format="bold" icon={<MdFormatBold />} />
            <MarkButton format="italic" icon={<MdFormatItalic />} />
            <MarkButton format="underline" icon={<MdFormatUnderlined />} />
            {/* <MarkButton format="code" icon={<MdCode />} />
            <BlockButton format="heading-one" icon={<MdLooksOne />} />
            <BlockButton format="heading-two" icon={<MdLooksTwo />} />
            <BlockButton format="block-quote" icon={<MdFormatQuote />} /> */}
            {/* <BlockButton
                format="numbered-list"
                icon={<MdFormatListNumbered />}
            />
            <BlockButton
                format="bulleted-list"
                icon={<MdFormatListBulleted />}
            /> */}
        </HStack>
    );
};

Element.propTypes = {
    attributes: PropTypes.instanceOf(Object).isRequired,
    children: PropTypes.instanceOf(Object).isRequired,
    element: PropTypes.instanceOf(Object).isRequired,
};

Leaf.propTypes = {
    attributes: PropTypes.instanceOf(Object).isRequired,
    children: PropTypes.instanceOf(Object).isRequired,
    leaf: PropTypes.instanceOf(Object).isRequired,
};
