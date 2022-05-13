import { Badge, Icon } from '@livechat/design-system-react-components';
import { Add } from '@livechat/design-system-icons/react/material';

function App() {
  return (
    <div>
      Hello world <Badge secondary>my badge</Badge>
      <Icon source={Add} />
    </div>
  );
}

export default App;
