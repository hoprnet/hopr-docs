import React from 'react'
import clsx from 'clsx'
import styles from './HOPRfrontPage.module.css'
import useBaseUrl from '@docusaurus/useBaseUrl'

/**
 *<img src={require('@site/static/img/front_icons/shield.png').default} />
 * **/

const FeatureList = [
  /*{
    title: 'About HOPR',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-about.svg'} />,
    description: <>Brief explanation what is HOPR.</>,
    docName: 'v1.86/about-hopr'
  },
  {
    title: 'Install a hoprd node',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-node-setup.svg'} />,
    description: <>Guide on how to install a hoprd node.</>,
    docName: 'v1.86/node/start-here'
  },*/
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
  /*{
    title: 'Staking',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-staking.svg'} />,
    description: <>How to earn money by staking on HOPR smart contract.</>,
    docName: 'v1.86/staking/how-to-stake'
  },*/
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
  /*{
    title: 'Ecosystem',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-ecosystem.svg'} />,
    description: <>Everything you need to know about HOPR's ecosystem.</>,
    docName: 'ecosystem/introduction'
  },
  {
    title: 'FAQ',
    Svg: <img class="svg_icon" src={'/img/front_icons/hopr-faqs.svg'} />,
    description: <>Frequently asked questions related to HOPR.</>,
    docName: 'v1.86/faq'
  }*/
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
