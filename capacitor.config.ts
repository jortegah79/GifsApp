import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jortegah79giffsapp.www',
  appName: 'gifs-app',
  webDir: 'dist/gifs-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
