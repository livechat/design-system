import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const { error } = console;

console.error = (message, ...args) => {
  if (/(Invalid prop|Failed prop type)/gi.test(message)) {
    throw new Error(message);
  }

  error.apply(console, [message, ...args]);
};

configure({ adapter: new Adapter() });
