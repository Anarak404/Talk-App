import PushNotification from 'react-native-push-notification';

const channelId = 'talk-app';

export const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId,
      channelName: 'Talk app',
      vibrate: true,
    },
    (created) => console.log('channel created!')
  );
};

export const showNotification = (message: string, title: string) => {
  PushNotification.localNotification({
    message,
    channelId,
    title,
  });
};
