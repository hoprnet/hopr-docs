import React from 'react';
import TOC from '@theme-original/TOC';

export default function TOCWrapper(props) {
  return (
    <div className="TOC_Layout">
      <h4>Table of Contents</h4>
      <TOC {...props} />
    </div>
  );
}
