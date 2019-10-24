import { generateUniqueId } from '@livechat/data-utils';

const generateNotificationUniqueId = notifications =>
  generateUniqueId(notifications);

export default generateNotificationUniqueId;
