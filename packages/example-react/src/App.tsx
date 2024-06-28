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
  const { toggleTheme, theme, setCustomVariables } = useTheme();

  const handleSetCustomVariables = () => {
    setCustomVariables({ '--content-basic-primary': '#0000ff' });
  };

  return (
    <div style={{ background: `var(${DesignToken.SurfacePrimaryDefault})` }}>
      <Heading style={{ color: `var(${DesignToken.ContentBasicPrimary})` }}>
        Hello world <Badge kind="secondary">my badge</Badge>
      </Heading>
      <Icon source={Add} />
      <Text style={{ color: `var(${DesignToken.ContentBasicPrimary})` }}>
        Current theme is: {theme}
      </Text>
      <Button kind="secondary" onClick={toggleTheme}>
        Toggle theme
      </Button>
      <Button kind="secondary" onClick={handleSetCustomVariables}>
        Set custom variables
      </Button>
    </div>
  );
}

export default App;
