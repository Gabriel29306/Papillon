import type { WidgetConfigurationScreenProps } from 'react-native-android-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WidgetPreview } from 'react-native-android-widget';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import React from 'react';
import { useTheme, Text } from 'react-native-paper';

import GetUIColors from '../utils/GetUIColors';
import CourseWidget from './CourseWidget';

const widgetBg = require('../assets/bkg_gradient.png');

const COURSE_WIDGET_CONF_KEY = 'CourseWidget:scroll';

export function WidgetConfigurationScreen({
  widgetInfo,
  setResult,
  renderWidget,
}: WidgetConfigurationScreenProps) {
  const theme = useTheme();
  const UIColors = GetUIColors();

  const [courseConfig, setCourseConfig] = React.useState({});
  const [howMuchCoursesToLoads, setHowMuchCoursesToLoads ] = React.useState();
  const [widgetTheme, setWidgetTheme] = React.useState('auto');

  React.useEffect(() => {
    async function init() {
      const courseWidgetsConfigStr = await AsyncStorage.getItem(COURSE_WIDGET_CONF_KEY);
      const courseWidgetsConfigJson = JSON.parse(courseWidgetsConfigStr ?? '{}');

      setCourseConfig(courseWidgetsConfigJson[widgetInfo.widgetId]);
    }
    init();
  }, [widgetInfo.widgetId]);

  function ok() {
    async function saveAndExit() {
    }
  }

  if (widgetInfo.widgetName == 'Course') {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <View
          style={{
            flex:1,
            borderWidth: 2,
            borderColor: '#000',
            borderRadius: 16,
            marginHorizontal: 2,
            marginTop: 16,
            overflow: 'hidden'
          }}
        >
          <ImageBackground
            source={widgetBg}
            style={{
              flex:1
            }}
          >
            <Text
              style={{
                color: 'white',
                ...styles.title
              }}
            >
              Aperçu
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <WidgetPreview
                height={widgetInfo.height}
                width={widgetInfo.width}
                renderWidget={() => (<CourseWidget />)}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={{
          flex: 3,
        }}
        >
          <Text
            style={{
              marginHorizontal: 2,
              ...styles.title
            }}
          >
            Paramètres
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontFamily: 'Papillon-Semibold',
    padding: 16,
    borderBottomWidth: 2
  }
});
