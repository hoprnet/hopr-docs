import React from 'react'
import clsx from 'clsx'
import Translate from '@docusaurus/Translate'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'

// Ejected from @docusaurus/theme-classic to control vertical rhythm: the site
// sets --ifm-heading-margin-bottom to 0 and --ifm-paragraph-margin-bottom to
// 5px globally, so spacing here is set explicitly rather than inherited.
export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title" style={{ marginBottom: '1.5rem' }}>
            <Translate id="theme.NotFound.title" description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p style={{ marginBottom: '1rem' }}>
            <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>
          <p style={{ marginBottom: 0 }}>
            <Translate id="theme.NotFound.p2" description="The 2nd paragraph of the 404 page">
              Please contact the owner of the site that linked you to the original URL and let them
              know their link is broken.
            </Translate>
          </p>
          <hr style={{ margin: '2.5rem 0' }} />
          {/* `markdown` is scoped to this block only: it restores the site's blue
              underlined link styling, but applied higher up it also shrinks the h1. */}
          <div className="markdown">
            <p style={{ marginBottom: '1rem' }}>
              Looking for developer documentation? That section has been retired.
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 2 }}>
              <li>
                <Link to="/">Documentation home</Link>
              </li>
              <li>
                <Link to="/node/run-a-node-overview">Run a Node</Link>
              </li>
              <li>
                <Link to="/core/what-is-hopr">What is HOPR?</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
