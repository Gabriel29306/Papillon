import React from 'react';
import { FlexWidget, TextWidget, ListWidget } from 'react-native-android-widget';
import { StyleSheet } from 'react-native';

interface ConfigurableWidgetProps {
  scroll: boolean,
  mode: string
}

export default function CourseWidget({scroll = true, mode = 'auto'}: ConfigurableWidgetProps) {
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
          margin: 0,
          overflow: 'none'
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
        ...containerStyle,
        ...styles.course
      }}
    >
      <TextWidget
        text={emoji}
        style={{...emojiStyle, ...styles.emoji}}
        allowFontScaling={false}
      />
      <FlexWidget
        style={{
          backgroundColor: firstItem ? '#0000' : color,
          ...styles.separator
        }}
      />
      <FlexWidget style={{
        flex: 3
      }}>
        <TextWidget 
          text={name}
          truncate='END'
          style={{
            color: firstItem ? '#fff' : '#000',
            ...styles.courseNameText
          }}
          maxLines={1}
          allowFontScaling={false}
        />
        <TextWidget 
          text={room}
          truncate='END'
          style={{
            color: firstItem ? '#fff8' : '#0008',
            ...styles.roomText
          }}
          maxLines={1}
          allowFontScaling={false}
        />
      </FlexWidget>
      <TextWidget
        style={{
          backgroundColor: hourBackgroundColor,
          color: hourTextColor,
          ...styles.hourText
        }}
        text={hour}
        allowFontScaling={false}
      />
    </FlexWidget>
  );
}
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  course: {
    width: 'match_parent',
    height: 55,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexGap: 5,
    margin: 0,
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
  },
  separator: {
    height: 'match_parent',
    width: 4,
    paddingVertical: 10,
    borderRadius: 300,
    marginHorizontal: 10
  },
  courseNameText: {
    height: 20,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20.29,
  },
  roomText: {
    height: 18,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 17.9,
  },
  hourText: {
    borderRadius: 8,
    fontSize: 16,
    flex: 1,
    width: 'wrap_content',
    paddingVertical: 3,
    paddingHorizontal: 7,
  }
});
