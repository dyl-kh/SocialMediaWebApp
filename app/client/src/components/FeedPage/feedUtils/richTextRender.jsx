import React from 'react';
import { v4 as uuid } from 'uuid';
import escapeHtml from 'escape-html';
import { Node } from 'slate';

const richTextRender = nodes => {
    return JSON.parse(nodes).map(node => {
        const formattedNode = node.children.map(child => {
            let string = escapeHtml(Node.string(child));
            if (child.bold) {
                string = <b key={uuid()}>{string}</b>;
            }
            if (child.italic) {
                string = <i key={uuid()}>{string}</i>;
            }
            if (child.underline) {
                string = <u key={uuid()}>{string}</u>;
            }

            return string;
        });

        if (node.type === 'paragraph') {
            return (
                <p key={uuid()} style={{ marginBottom: '-25px' }}>
                    {formattedNode}
                </p>
            );
        }
        return formattedNode;
    });
};

export default richTextRender;
