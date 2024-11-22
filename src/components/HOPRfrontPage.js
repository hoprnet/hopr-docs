import React from 'react'
import clsx from 'clsx'
import styles from './HOPRfrontPage.module.css'
import useBaseUrl from '@docusaurus/useBaseUrl'

/**
 *<img src={require('@site/static/img/front_icons/shield.png').default} />
 * **/

const FeatureList = [
  {
    title: 'What is HOPR?',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-core-concepts.svg'} />,
    description: <>Core concepts & broader educational material for understanding HOPR.</>,
    docName: 'core/what-is-hopr'
  },
  {
    title: 'Run a Node',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-node.svg'} />,
    description: <>Learn to set up and run a node for the decentralized HOPR network.</>,
    docName: 'node/run-a-node-overview'
  },
  {
    title: 'For Developers',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-development.svg'} />,
    description: <>Learn how to build apps on top of the HOPR network.</>,
    docName: 'developers/intro'
  },
  {
    title: 'Token Economics',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-staking.svg'} />,
    description: <>Learn the principles of token value, utility and operations.</>,
    docName: 'token/safestaking'
  },
  {
    title: 'dApps',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-dapps.svg'} />,
    description: <>Documentations and guides of dApps built on HOPR.</>,
    docName: 'dapps/dapps-rpch'
  },
  {
    title: 'Glossary',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-faqs.svg'} />,
    description: <>A glossary of key terms and definitions related to HOPR.</>,
    docName: 'glossary'
  }
]

function Feature({ Svg, title, description, docName }) {
  return (
    <a href={docName} className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-5">
      <div className="highlightPanel">
        <div className="d-flex flex-row align-items-center mb-2">
          <span className="icon" aria-label="icon">
            {Svg}
          </span>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
    </a>
  )
}

export default function HOPRfrontPage() {
  return (
    <div className="mainContainer landing-page">
      <meta property="og:image" content="/img/share.jpg" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col text-center title-container mt-5 mt-lg-0">
            <h1 className="m-0 font-montserrat">
              Welcome to the HOPR docs!
              <br />
            </h1>
          </div>
        </div>
        <div className="row justify-content-center pt-5">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </div>
  )
}
