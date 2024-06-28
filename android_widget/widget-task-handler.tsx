import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import CourseWidget from './CourseWidget';
import AsyncStorage from '@react-native-async-storage/async-storage';

const widgets = {
  Course: CourseWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
  widgets[widgetInfo.widgetName as keyof typeof widgets];

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(<Widget />);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(<Widget />);
      break;

    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget />);
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':
      props.renderWidget(<Widget />);
      break;

    default:
      break;
  }
}
