import { Add } from '@livechat/design-system-icons';
import {
  Badge,
  Icon,
  Button,
  DesignToken,
  useTheme,
  Text,
  Heading,
} from '@livechat/design-system-react-components';

function App() {
  const { toggleTheme, theme } = useTheme();

  return (
    <div style={{ background: `var(${DesignToken.SurfacePrimaryDefault})` }}>
      <Heading>
        Hello world <Badge kind="secondary">my badge</Badge>
      </Heading>
      <Icon source={Add} />
      <Text>Current theme is: {theme}</Text>
      <Button kind="secondary" onClick={toggleTheme}>
        Toggle theme
      </Button>
    </div>
  );
}

export default App;
