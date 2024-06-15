module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      plugins: [
        [
          '@babel/plugin-transform-private-methods',
          {
            loose: true,
          },
        ],
        [
          'module-resolver',
          {
            root: ['./src'],
            extensions: ['.js', '.tsx', '.ts'],
            alias: {},
          },
        ],
      ],
    },
  ],
};
