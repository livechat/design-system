import { Add } from '@livechat/design-system-icons/react/material';
import { Badge, Icon } from '@livechat/design-system-react-components';

function App() {
  return (
    <div>
      Hello world <Badge kind="secondary">my badge</Badge>
      <Icon source={Add} />
    </div>
  );
}

export default App;
