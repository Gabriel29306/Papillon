import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WidgetPreview, requestWidgetUpdate } from 'react-native-android-widget';

import CourseWidget from '../../../android_widget/CourseWidget';

import { FlexWidget, TextWidget, ListWidget } from 'react-native-android-widget';

export default function PreviewWidgetScreen() {
  React.useEffect(() => {
    requestWidgetUpdate({
      widgetName: 'Course',
      renderWidget: () => {
        console.log('Wiget "Course" actualisé');
        return (<CourseWidget />);
      },
      widgetNotFound: () => {
        console.error('Impossible de trouver le widget "Course"');
      }
    });
  });
  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <Course />}
        width={338}
        height={158}
        showBorder={false}
      />
    </View>
  );
}

function Course() {
  const courses = [
    { 'name': 'Espagnol LV2',
      'emoji': '🇪🇸',
      'hour': '10:05',
      'room': 'salle C-1764',
      'status': '',
      'color': '#a55c31'
    },
    { 'name': 'Physique-Chimie',
      'emoji': '🔬',
      'hour': '11:00',
      'room': 'salle info D1506',
      'status': '',
      'color': '#3190a5'
    },
    { 'name': 'Science & vie de la terre',
      'emoji': '🌱',
      'hour': '12h15',
      'status': 'Cours annulé',
      'room': 'salle D4 15 postes informatiques',
      'color': '#2caa7c'
    }
  ];
  let firstItem = true;
  let prerendered: CourseItem[] = [];
  for (const [name, content] of Object.entries(courses)) {
    if (firstItem) { firstItem = false; }
    prerendered.push(<CourseItem key={name} course={content} first={firstItem}></CourseItem>);
  } 

  return (
    <FlexWidget
      style={{
        borderRadius: 21,
        height: 'match_parent',
        width: 'match_parent',
        overflow: 'hidden',
        padding: 0,
        borderWidth: 0
      }}
    >
      <ListWidget
        style={{
          backgroundColor: '#fff',
          margin: 0
        }}
      >
        {Array.from(courses).map((item: {'name': string, 'emoji': string, 'hour': string, 'room': string, 'status': string}, index) => (
          <CourseItem course={item} first={index == 0} key={index}/>
        ))}
      </ListWidget>
    </FlexWidget>
  );
}

function CourseItem(input) {
  const course: {
    'name': string,
    'emoji': string,
    'status': string,
    'hour': string,
    'room': string,
    'color': string} = input['course'];
  const firstItem: boolean = input['first'];
  const name: string = course['name'];
  const emoji: string = course['emoji'];
  const hour: string = course['status'] || course['hour'];
  const room: string = course['room'];
  const color: string = course['color'];
  const emojiStyle = firstItem ? styles.firstElemEmoji : {};
  const containerStyle = firstItem ? styles.firstElemContainer : {};
  let hourBackgroundColor = firstItem ? '#fff4' : '#3291A640';
  hourBackgroundColor = course['status'] ? '#B4282840' : hourBackgroundColor;
  let hourTextColor = firstItem ? '#FFF' : '#3291A6';
  hourTextColor = course['status'] ? '#B42828' : hourTextColor;
  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 55,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexGap: 5,
        margin: 0,
        ...containerStyle
      }}
    >
      <TextWidget
        text={emoji}
        style={{...emojiStyle, ...styles.emoji}}
      />
      <FlexWidget
        style={{
          height: 'match_parent',
          width: 4,
          paddingVertical: 10,
          borderRadius: 300,
          backgroundColor: firstItem ? '#0000' : color,
          marginHorizontal: 10
        }}
      />
      <FlexWidget style={{
        flex: 3
      }}>
        <TextWidget 
          text={name}
          truncate='END'
          style={{
            height: 20,
            fontSize: 17,
            fontWeight: '600',
            lineHeight: 20.29,
            color: firstItem ? '#fff' : '#000'
          }}
          maxLines={1}
        />
        <TextWidget 
          text={room}
          truncate='END'
          style={{
            height: 18,
            fontSize: 15,
            fontWeight: '600',
            lineHeight: 17.9,
            color: firstItem ? '#fff8' : '#0008'
          }}
          maxLines={1}
        />
      </FlexWidget>
      <TextWidget
        style={{
          width: 'wrap_content',
          paddingVertical: 3,
          paddingHorizontal: 7,
          backgroundColor: hourBackgroundColor,
          borderRadius: 8,
          color: hourTextColor,
          fontSize: 16,
          flex: 1
        }}
        text={hour}
      />
    </FlexWidget>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  emoji: {
    borderRadius: 100,
    height: 36,
    width: 36,
    fontSize: 23,
    lineHeight: 23,
    textAlign: 'center',
    fontWeight: '500',
    flex: 1,
  },
  firstElemEmoji: {
    borderColor: 'hsla(0, 0%, 100%, 0.15)',
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF26'
  },
  firstElemContainer: {
    backgroundColor: '#29947b'
  }
});
