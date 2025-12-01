import React from 'react';
import { Icon } from '../index';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon size={24} color="#165dff">
      <path d="M8 2L8 14M2 8L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  </div>
);
