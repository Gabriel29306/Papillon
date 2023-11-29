import AsyncStorage from '@react-native-async-storage/async-storage';
import getConsts from '../consts';

import { refreshToken } from '../AuthStack/LoginFlow';

// eslint-disable-next-line no-unused-vars
function getConversations(force = false) {
  return getConsts().then((consts) =>
    AsyncStorage.getItem('token')
      .then((token) =>
        // fetch le discussions
        fetch(`${consts.API}/discussions?token=${token}`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then(async (result) => {
            if (result === 'expired' || result === 'notfound') {
              return refreshToken().then(() => getConversations());
            }
            return result;
          })
          .catch(() => {})
      )
      .catch(() => {})
  );
}

function replyToConversation(id, message) {
  message = encodeURIComponent(message);

  return getConsts().then((consts) =>
    AsyncStorage.getItem('token')
      .then((token) =>
        // fetch le discussions
        fetch(`${consts.API}/discussion/reply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `token=${token}&discussionId=${id}&content=${message}`,
        })
          .then((response) => response.json())
          .then(async (result) => {
            if (result === 'expired' || result === 'notfound') {
              return refreshToken().then(() => replyToConversation(id, message));
            }
            console.log(result);
            return result;
          })
          .catch(() => {})
      )
      .catch(() => {})
  );
}

function readStateConversation(id) {
  return getConsts().then((consts) =>
    AsyncStorage.getItem('token')
      .then((token) =>
        // fetch le discussions
        fetch(`${consts.API}/discussion/readState`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `token=${token}&discussionId=${id}`,
        })
          .then((response) => response.json())
          .then(async (result) => {
            if (result === 'expired' || result === 'notfound') {
              return refreshToken().then(() => readStateConversation(id));
            }
            console.log(result);
            return result;
          })
          .catch(() => {})
      )
      .catch(() => {})
  );
}

export { getConversations, replyToConversation, readStateConversation };
