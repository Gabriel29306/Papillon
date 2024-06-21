import { FC } from 'react';

interface GradeEmojiList {
  [key: string]: string;
}

const getClosestGradeEmoji = (subjectName: string): string => {
  const gradeEmojiList: GradeEmojiList = {
    numerique: '💻',
    SI: '💻',
    SNT: '💻',
    travaux: '⚒',
    travail: '💼',
    moral: '⚖️',
    env: '🌿',
    sport: '🏀',
    EPS: '🏀',
    econo: '📈',
    francais: '📚',
    anglais: '🇬🇧',
    allemand: '🇩🇪',
    espagnol: '🇪🇸',
    latin: '🏛️',
    italien: '🇮🇹',
    histoire: '📜',
    EMC: '🤝',
    hist: '📜',
    llc: '🌍',
    scientifique: '🔬',
    arts: '🎨',
    philosophie: '🤔',
    math: '📐',
    phys: '🧪',
    accomp: '👨‍🏫',
    tech: '🔧',
    ingenieur: '🔧',
    musique: '🎼',
    musical: '🎼',
    classe: '🏫',
    vie: '🧬',
    SES: '💰',
    stage: '👔',
    œuvre: '🖼️',
    default: '📝',
  };

  const subjectNameFormatted: string = subjectName
    .toLowerCase()
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // sort keys by length in descending order
  const sortedKeys: string[] = Object.keys(gradeEmojiList).sort((a, b) => b.length - a.length);

  // get emoji with key in subject name
  const closest: string = sortedKeys.find((key) => subjectNameFormatted.includes(key)) || 'default';

  return gradeEmojiList[closest];
};

export default getClosestGradeEmoji;