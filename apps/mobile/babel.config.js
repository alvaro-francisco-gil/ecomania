module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated 4 moved its Babel plugin into react-native-worklets. It must stay LAST.
    plugins: ['react-native-worklets/plugin'],
  };
};
