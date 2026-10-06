// Marks Markdown structures that the v5 page design styles (src/css/custom.css).
//
// - Step lists: an ordered list where every item starts with a paragraph that is
//   only bold text ("1. **Install Docker**") gets class "steps". CSS turns it into
//   the numbered step rail. CSS alone can't tell "**Title**" from
//   "Open the **Terminal** app", so this is decided here, where the text is known.
// - Code labels: a short paragraph that starts with bold text and ends with ":",
//   directly followed by a code block ("**Linux / macOS** (Terminal):"), gets
//   class "code-label".
//
// Only v5.0.0 docs are touched, so older versions render exactly as before.

const MAX_LABEL_LENGTH = 60;

function isWhitespaceText(node) {
  return node.type === 'text' && !node.value.trim();
}

function textOf(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children || []).map(textOf).join('');
}

function addClass(node, className) {
  node.data = node.data || {};
  node.data.hProperties = node.data.hProperties || {};
  const existing = node.data.hProperties.className || [];
  node.data.hProperties.className = [...existing, className];
}

function isTitleParagraph(node) {
  if (!node || node.type !== 'paragraph') return false;
  const content = node.children.filter((child) => !isWhitespaceText(child));
  return content.length === 1 && content[0].type === 'strong';
}

function isStepList(node) {
  return (
    node.type === 'list' &&
    node.ordered &&
    node.children.length > 0 &&
    node.children.every((item) => isTitleParagraph(item.children[0]))
  );
}

function isCodeLabel(node, next) {
  if (node.type !== 'paragraph' || !next || next.type !== 'code') return false;
  const first = node.children[0];
  const text = textOf(node).trim();
  return first && first.type === 'strong' && text.endsWith(':') && text.length <= MAX_LABEL_LENGTH;
}

function walk(node) {
  const children = node.children || [];
  children.forEach((child, i) => {
    if (isStepList(child)) {
      addClass(child, 'steps');
      // Keep each title in its own <p>, even in a tight list, so it can be styled.
      child.spread = true;
    }
    if (isCodeLabel(child, children[i + 1])) addClass(child, 'code-label');
    walk(child);
  });
}

module.exports = function remarkSteps() {
  return (tree, file) => {
    const filePath = (file && (file.path || (file.history && file.history[0]))) || '';
    if (!filePath.includes('version-v5.0.0')) return;
    walk(tree);
  };
};
