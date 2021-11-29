// Object for mocking @livechat/design-system-icons package
// export default {};
module.exports = new Proxy({}, { get: () => () => 'icon' });
