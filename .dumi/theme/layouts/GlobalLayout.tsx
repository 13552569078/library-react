import { ConfigProvider } from 'antd';
import { useIntl, useLocation, useOutlet, usePrefersColor } from 'dumi';
import { GlobalLayout as ThemeGlobalLayout } from 'dumi-theme-antd-laf';
import React from 'react';
import '@arco-design/web-react/dist/css/arco.css';
import '@arco-themes/react-cecloud-design/css/arco.css';
import '../../../src/styles/index.less';
import './index.scss';
import './ai.theme.less';

import SiteThemeProvider from '../SiteThemeProvider';

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const [color] = usePrefersColor();
  const { locale } = useIntl();

  return (
    // @ts-ignore ts props error in dumi theme
    <ThemeGlobalLayout>
      <ConfigProvider>
        <SiteThemeProvider themeMode={color || 'auto'}>
          <div className={pathname === '/' || pathname === '/index-cn' ? 'home' : ''}>{outlet}</div>
        </SiteThemeProvider>
      </ConfigProvider>
    </ThemeGlobalLayout>
  );
};

export default GlobalLayout;
