// Replaces the {{DOCS_URL}} placeholder in code blocks and inline code with the
// URL this build is published at (see consts/index.js), so commands such as
// `curl {{DOCS_URL}}/files/hoprd-docker.cfg.yaml` point at a Vercel preview on
// preview deployments and at docs.hoprnet.org in production.
//
// Only code is touched: in plain MDX text, "{" starts a JavaScript expression.

const { DOCS_URL } = require('../../consts');

const PLACEHOLDER = '{{DOCS_URL}}';

function replaceIn(node) {
  if ((node.type === 'code' || node.type === 'inlineCode') && node.value.includes(PLACEHOLDER)) {
    node.value = node.value.split(PLACEHOLDER).join(DOCS_URL);
  }
  (node.children || []).forEach(replaceIn);
}

module.exports = function docsUrl() {
  return (tree) => replaceIn(tree);
};
