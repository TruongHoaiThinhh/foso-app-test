const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName.endsWith('.mjs') &&
    context.originModulePath.includes(`${path.sep}lucide-react-native${path.sep}`)
  ) {
    return {
      type: 'sourceFile',
      filePath: path.resolve(path.dirname(context.originModulePath), moduleName),
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
