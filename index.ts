import { registerRootComponent } from 'expo';
import App from './App';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry } from 'react-native';
import { registerWidgetTaskHandler, registerWidgetConfigurationScreen } from 'react-native-android-widget';
import { widgetTaskHandler } from './android_widget/widget-task-handler';
import { WidgetConfigurationScreen } from './android_widget/ConfigurationScreen';
import { name as appName } from './package.json';


AppRegistry.registerComponent(appName, () => App);
registerWidgetTaskHandler(widgetTaskHandler);
registerWidgetConfigurationScreen(WidgetConfigurationScreen);

async function initLogs() {
  let logs = await AsyncStorage.getItem('logs');
  if(logs) await AsyncStorage.removeItem('logs');
  let logsArray: Array = [];
  AsyncStorage.setItem('logs', '[]');
  let console1 = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info
  };
  console.log = function log(...msg) {
    logsArray.push({type: 'log', message: msg.join(' '), time: Date.now()});
    AsyncStorage.setItem('logs', JSON.stringify(logsArray));
    console1.log(msg.join(' '));
  };
  console.info = function info(...msg) {
    logsArray.push({type: 'info', message: msg.join(' '), time: Date.now()});
    AsyncStorage.setItem('logs', JSON.stringify(logsArray));
    console1.info(msg.join(' '));
  };
  console.warn = function warn(...msg) {
    logsArray.push({type: 'warn', message: msg.join(' '), time: Date.now()});
    AsyncStorage.setItem('logs', JSON.stringify(logsArray));
    console1.warn(msg.join(' '));
  };
  console.error = function warn(...msg) {
    logsArray.push({type: 'error', message: msg.join(' '), time: Date.now()});
    AsyncStorage.setItem('logs', JSON.stringify(logsArray));
    console1.error(msg.join(' '));
  };
}
initLogs();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
