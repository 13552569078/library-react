import { useEffect, useState } from 'react';
import { LoginLogoBase64Png, HeaderLogoBase64Png } from '../../utils';

export function useLogo(GetConfig: () => Promise<any>) {
  const [loginLogo, setLoginLogo] = useState('');
  const [headerLogo, setHeaderLogo] = useState('');

  const updateFavicon = (base64Data: string, type: string) => {
    const link = document.getElementById('favIcon') as HTMLLinkElement;
    if (link) {
      link.type = type;
      link.rel = 'shortcut icon';
      link.href = base64Data;
    }
  };

  useEffect(() => {
    const getLogo = async () => {
      const {
        data: { logo },
      } = await GetConfig();
      if (logo.title.base64) {
        setHeaderLogo(`data:${logo.title.type};base64,${logo.title.base64}`);
      } else {
        setHeaderLogo(HeaderLogoBase64Png);
      }

      if (logo.login.base64) {
        setLoginLogo(`data:${logo.login.type};base64,${logo.login.base64}`);
      } else {
        setLoginLogo(LoginLogoBase64Png);
      }

      if (logo.webtab.base64 && logo.webtab.type) {
        updateFavicon(`data:${logo.webtab.type};base64,${logo.webtab.base64}`, logo.webtab.type);
      }
    };
    getLogo();
  }, []);

  return {
    loginLogo,
    headerLogo,
  };
}
