/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  
  tutorialSidebar: [
    {
	type: 'category',
	label: 'About HOPR',
	items: ['about-hopr'],
    },
    /* {
      type: 'doc',
      id: 'intro',
      label: 'Welcome to HOPR',
    },*/
    {
      type: 'category',
      label: 'Installing a hoprd node',
      items: ['node/start-here', 'node/using-script', 'node/using-avado','node/using-npm', 'node/using-docker'],
    },
    {
      type: 'category',
      label: 'Run a hoprd node',
      items: ['node/guide-using-a-hoprd-node', 'node/hoprd-commands'],
    },
    {
        type: 'category',
        label: 'HOPR core concepts',
        items: ['core/what-is-hopr','core/what-is-metadata', 'core/anonymous-routing', 'core/mixnets', 'core/incentives', 'core/proof-of-relay', 'core/tickets-and-payment-channels', 'core/probabilistic-payments', 'core/incentives', 'core/cover-traffic', 'core/cover-traffic-nodes', 'core/balancing-cover-traffic'],
    },
    {
	type: 'category',
	label: 'Staking',
	items: ['staking/how-to-get-hopr', 'staking/how-to-stake', 'staking/convert-hopr'],
    },  
    /*{
        type: 'doc',
	id: 'staking',
        label: 'Staking',
    },*/
    {
        type: 'doc',
	id: 'faq',
        label: 'FAQ',
    },
  ],
   
};

module.exports = sidebars;
