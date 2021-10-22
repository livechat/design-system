// Object for mocking @livechat/design-system-icons package
module.exports = new Proxy({}, { get: () => () => 'icon' });
