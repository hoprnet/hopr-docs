// On Vercel preview deployments, use the branch's preview URL so links and
// commands built from DOCS_URL point at the preview. VERCEL_BRANCH_URL stays the
// same for every push to a branch; production and local builds use the public URL.
const previewHost = process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_BRANCH_URL

module.exports = {
  DOCS_URL: previewHost ? `https://${previewHost}` : 'https://docs.hoprnet.org'
}
