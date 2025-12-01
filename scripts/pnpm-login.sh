#/usr/bin/env sh

registry=https://npm.cestc.cn
if pnpm whoami --registry $registry 2> /dev/null; then
  echo "Already logged in to $registry"
else
  echo "Logging in to $registry"
  pnpm login --registry $registry
fi
