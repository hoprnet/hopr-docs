import React from 'react';
import clsx from 'clsx';
import OriginalDocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  const groupClass = props?.content?.frontMatter?.group || null;

  return (
    <div className={clsx(groupClass)}>
      <OriginalDocItem {...props} />
    </div>
  );
}
