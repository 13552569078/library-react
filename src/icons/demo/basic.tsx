import React from 'react';
import { IconFileCsv, IconFileApk, IconFileAudio, IconFileVideo } from '../index';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <IconFileCsv size={24} />
    <IconFileApk size={24} color="#165dff" />
    <IconFileAudio size={24} color="#f53f3f" />
    <IconFileVideo size={24} color="#00b42a" />
  </div>
);
