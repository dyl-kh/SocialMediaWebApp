import escapeHtml from 'escape-html';
import { Node } from 'slate';

// this function accepts a json string and returns a raw string
// of the unformatted content
const previewRender = nodes => {
    const parsed = JSON.parse(nodes).map(node => {
        const formattedNode = node.children.map(child => {
            return escapeHtml(Node.string(child));
        });

        return formattedNode.join(' ');
    });

    return parsed.join(' ');
};

export default previewRender;
