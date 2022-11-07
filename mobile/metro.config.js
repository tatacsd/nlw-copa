const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { transform, resolver } = config;
  config.transformer = {
    ...transform,
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer'
    ),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(
      (ext) => ext !== 'svg'
    ),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };
  return config;
})();
