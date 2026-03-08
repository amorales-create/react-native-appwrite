module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind|@testing-library/.*|react-redux|@reduxjs/.*|immer))',
  ],
  // Usamos la librería directamente en lugar de un archivo mock
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
};