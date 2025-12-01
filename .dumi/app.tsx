import React, { useState } from 'react';
import { ConfigProvider } from 'antd';

export function rootContainer(container: React.ReactNode): React.ReactNode {
  navigation?.addEventListener('navigate', (event) => {
    try {
      const pageClassList = document.querySelector('.page-wrapper').classList;
      if (event.destination.url.includes('/icons')) {
        pageClassList.add('icons-page');
      } else {
        pageClassList.remove('icons-page');
      }
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <ConfigProvider>
      <div className={`page-wrapper ${location.href.includes('/icons') ? 'icons-page' : ''}`}>
        {container}
      </div>
    </ConfigProvider>
  );
}
