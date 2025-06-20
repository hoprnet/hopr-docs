import React from 'react';

export function NoCounter({children}) {
  return <div className="no-counter">{children}</div>;
}

export function ReCounter({children}) {
  return <div className="re-counter">{children}</div>;
}