import { Icon } from '@livechat/design-system-icons';
import { Badge } from '@livechat/design-system-react-components';

function App() {
  return (
    <div>
      Hello world <Badge kind="secondary">my badge</Badge>
      <Icon set="tabler" name="Activities" />
    </div>
  );
}

export default App;
