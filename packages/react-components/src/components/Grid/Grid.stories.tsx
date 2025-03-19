import * as React from 'react';

import { ArrowDownward, ArrowForward } from '@livechat/design-system-icons';

import { Badge } from '../Badge';
import { Card } from '../Card';
import { Icon } from '../Icon';
import { Heading, Text } from '../Typography';

import { GridVisualizer } from './components/GridVisualizer/GridVisualizer';
import { ToggleSwitch } from './components/GridVisualizer/ToggleSwitch';

import styles from './GridStylesStories.module.scss';

import { Grid, Column } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Styled div to make grid visible
const Box = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      backgroundColor: 'var(--surface-basic-active)',
      border: '1px solid var(--content-locked-black)',
      textAlign: 'center',
      height: '100%',

      minHeight: '50px',
      ...style,
    }}
  >
    {children}
  </div>
);

const GridWithVisualizer = ({ children }: { children: React.ReactNode }) => {
  const [showGrid, setShowGrid] = React.useState(true);

  return (
    <div>
      <ToggleSwitch
        checked={showGrid}
        onChange={setShowGrid}
        label="Show grid overlay"
      />
      <GridVisualizer showGrid={showGrid}>{children}</GridVisualizer>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={3} md={3} lg={3}>
          <Box>Column 1 (always 1/4 width)</Box>
        </Column>
        <Column sm={6} md={6} lg={6}>
          <Box>Column 2 (always 1/2 width)</Box>
        </Column>
        <Column>
          <Box>Column 3 (flexible)</Box>
        </Column>
        <Column>
          <Box>Column 4 (flexible)</Box>
        </Column>
        <Column sm={12}>
          <Box>Column 5 (full width)</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const FixedColumnPercentageSizes: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={12}>
          <Box>Full width (12/12)</Box>
        </Column>
        <Column sm={6}>
          <Box>1/2 width (6/12)</Box>
        </Column>
        <Column sm={6}>
          <Box>1/2 width (6/12)</Box>
        </Column>
        <Column sm={3}>
          <Box>1/4 width (3/12)</Box>
        </Column>
        <Column sm={3}>
          <Box>1/4 width (3/12)</Box>
        </Column>
        <Column sm={3}>
          <Box>1/4 width (3/12)</Box>
        </Column>
        <Column sm={3}>
          <Box>1/4 width (3/12)</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={4} md={8}>
          <Box>
            sm=4 md=4 lg and up=8
            <br />
            (Full width on small, half on medium and large and above)
          </Box>
        </Column>
        <Column sm={4} md={8}>
          <Box>
            sm=4 md=4 lg and up=8
            <br />
            (Full width on small, half on medium and large and above)
          </Box>
        </Column>
        <Column sm={4} md={2} lg={4}>
          <Box>sm=4 md=2 lg=4</Box>
        </Column>
        <Column sm={4} md={2} lg={4}>
          <Box>sm=4 md=2 lg=4</Box>
        </Column>
        <Column sm={4} md={2} lg={4}>
          <Box>sm=4 md=2 lg=4</Box>
        </Column>
        <Column sm={4} md={2} lg={4}>
          <Box>sm=4 md=2 lg=4</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const AutoColumns: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column>
          <Box>Auto width</Box>
        </Column>
        <Column>
          <Box>Auto width</Box>
        </Column>
        <Column>
          <Box>Auto width</Box>
        </Column>
        <Column sm={6}>
          <Box>Fixed width 50%</Box>
        </Column>
        <Column>
          <Box>Auto width</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const NestedGrid: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={6}>
          <Box>
            Outer Grid (6 columns)
            <Grid>
              <Column sm={6}>
                <Box>
                  Inner Grid (6 inner grid columns, 3 outer grid columns, 1/2 of
                  parent)
                </Box>
              </Column>
              <Column sm={6}>
                <Box>
                  Inner Grid (6 inner grid columns, 3 outer grid columns, 1/2 of
                  parent)
                </Box>
              </Column>
            </Grid>
          </Box>
        </Column>
        <Column sm={3}>
          <Box>Outer Grid (3 columns)</Box>
        </Column>
        <Column sm={3}>
          <Box>Outer Grid (3 columns)</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const ThreeColumnExample: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={1} md={2} lg={4}>
          <Box>Fixed Left (lg-4 columns, md-2 columns, sm-1 column)</Box>
        </Column>
        <Column>
          <Box>Auto-adjusting Middle</Box>
        </Column>
        <Column sm={1} md={2} lg={4}>
          <Box>Fixed Right (lg-4 columns, md-2 columns, sm-1 column)</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const Alignment: Story = {
  render: () => (
    <GridWithVisualizer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3>Vertical Alignment (align=end)</h3>
          <Grid align="end">
            <Column sm={2}>
              <Box style={{ height: '100px' }}>Tall</Box>
            </Column>
            <Column sm={2}>
              <Box style={{ height: '50px' }}>Short</Box>
            </Column>
            <Column sm={2}>
              <Box style={{ height: '75px' }}>Medium</Box>
            </Column>
          </Grid>
        </div>

        <div>
          <h3>Horizontal Alignment (justify=end)</h3>
          <Grid justify="end">
            <Column sm={1}>
              <Box>1</Box>
            </Column>
            <Column sm={1}>
              <Box>2</Box>
            </Column>
            <Column sm={1}>
              <Box>3</Box>
            </Column>
          </Grid>
        </div>

        <div>
          <h3>Combined Alignment (justify=center, align=center)</h3>
          <Grid align="center" justify="center">
            <Column sm={1}>
              <Box style={{ height: '100px' }}>Start</Box>
            </Column>
            <Column sm={1}>
              <Box style={{ height: '50px' }}>Middle</Box>
            </Column>
            <Column sm={1}>
              <Box style={{ height: '75px' }}>End</Box>
            </Column>
          </Grid>
        </div>
      </div>
    </GridWithVisualizer>
  ),
};

export const FixedColumnSizing: Story = {
  render: () => (
    <GridWithVisualizer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3>Fixed Width Columns</h3>
          <Grid>
            <Column width="200px">
              <Box>Fixed 200px</Box>
            </Column>
            <Column>
              <Box>Auto-flexible</Box>
            </Column>
            <Column width="300px">
              <Box>Fixed 300px</Box>
            </Column>
          </Grid>
        </div>

        <div>
          <h3>Min/Max Width Constraints</h3>
          <Grid>
            <Column minWidth="150px" maxWidth="300px">
              <Box>Flexible (min: 150px, max: 300px)</Box>
            </Column>
            <Column minWidth="200px">
              <Box>Flexible (min: 200px)</Box>
            </Column>
            <Column maxWidth="250px">
              <Box>Flexible (max: 250px)</Box>
            </Column>
          </Grid>
        </div>

        <div>
          <h3>Flexible width with Min/Max Constraints</h3>
          <Grid>
            <Column minWidth="200px" maxWidth="300px">
              <Box>constrained between 200px-300px</Box>
            </Column>
            <Column>
              <Box>Auto-flexible</Box>
            </Column>
          </Grid>
        </div>
      </div>
    </GridWithVisualizer>
  ),
};

export const Example1SalesFunnelReportCards: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={12} md={4}>
          <Card title="Total chats" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>2870</Heading>
              <Badge>80</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column sm={12} md={4}>
          <Card title="Sales conversion" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>45%</Heading>
              <Badge>12%</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column sm={12} md={4}>
          <Card title="Sales value" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>$13,6k</Heading>
              <Badge>540</Badge>
            </div>
            <Text>vs $13k for prev. period</Text>
          </Card>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const Example2TotalMetricsChangeSummary: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={12} md={6} lg={3}>
          <Card title="Automation Savings" className={styles.cardHeight}>
            <div className={styles.cardContent}>
              <Heading>2870</Heading>
              <Badge>80</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>

            <div className={styles.divider} />
            <div className={styles.cardContent}>
              <Heading>134$</Heading>
              <Badge>80</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column sm={12} md={6} lg={3}>
          <Card title="Total cases" className={styles.cardHeight}>
            <div className={styles.cardContent}>
              <Heading>2721</Heading>
              <Badge>810</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>

            <div className={styles.divider} />
            <div className={styles.cardContent}>
              <Heading>1343$</Heading>
              <Badge>80</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column sm={12} md={6} lg={3}>
          <div className={styles.wrapper}>
            <Card title="Chats first response time" className={styles.card}>
              <div className={styles.cardContent}>
                <Heading>28s</Heading>
                <Badge>2</Badge>
              </div>
              <Text>vs 2790 for prev. period</Text>
            </Card>
            <Card title="Tickets first response time" className={styles.card}>
              <div className={styles.cardContent}>
                <Heading>18s</Heading>
                <Badge>23</Badge>
              </div>
              <Text>vs 2790 for prev. period</Text>
            </Card>
          </div>
        </Column>
        <Column sm={12} md={6} lg={3}>
          <div className={styles.wrapper}>
            <Card title="Chats agents efficiency" className={styles.card}>
              <div className={styles.cardContent}>
                <Heading>80%</Heading>
                <Badge>80</Badge>
              </div>
              <Text>vs 2790 for prev. period</Text>
            </Card>
            <Card title="Tickets solved average" className={styles.card}>
              <div className={styles.cardContent}>
                <Heading>8.4h</Heading>
                <Badge>80</Badge>
              </div>
              <Text>vs 2790 for prev. period</Text>
            </Card>
          </div>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const Example3AutomationAiAgents: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid justify="center">
        <div>
          <Column sm={12}>
            <Heading>Skills</Heading>
          </Column>

          <Card className={styles.backgroundCard}>
            <Grid>
              <Column sm={12} md={4}>
                <Card title="Welcome message" className={styles.cardAutomation}>
                  <Badge>Ai Skill</Badge>
                </Card>
              </Column>
              <Column sm={12} md={4}>
                <Card
                  title="Order management"
                  className={styles.cardAutomation}
                >
                  <Badge>Ai Skill</Badge>
                </Card>
              </Column>
              <Column sm={12} md={4}>
                <Card title="Add skill" className={styles.cardAutomation}>
                  <Badge>+</Badge>
                </Card>
              </Column>
            </Grid>
          </Card>

          <Column sm={12}>
            <Heading>Knowledge</Heading>
          </Column>

          <Card className={styles.backgroundCard}>
            <Grid>
              <Column sm={12} md={4}>
                <Card
                  title="www.livechat.com"
                  className={styles.cardAutomation}
                >
                  <Badge>Website</Badge>
                </Card>
              </Column>
              <Column sm={12} md={4}>
                <Card title="Pricing plans" className={styles.cardAutomation}>
                  <Badge>PDF</Badge>
                </Card>
              </Column>
              <Column sm={12} md={4}>
                <Card title="Add knowledge" className={styles.cardAutomation}>
                  <Badge>+</Badge>
                </Card>
              </Column>
            </Grid>
          </Card>
        </div>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const Example4AutomationAiAgentsMinWidth: Story = {
  render: () => (
    <GridWithVisualizer>
      <div className={styles.gridWrapperMinWidth}>
        <Grid justify="center">
          <div>
            <Column sm={12}>
              <Heading>Skills</Heading>
            </Column>

            <Card className={styles.backgroundCard}>
              <Grid className={styles.gridVerticalGap}>
                <Column>
                  <Card
                    title="Welcome message"
                    className={styles.cardAutomation}
                  >
                    <Badge>Ai Skill</Badge>
                  </Card>
                </Column>
                <Column>
                  <Card
                    title="Order management"
                    className={styles.cardAutomation}
                  >
                    <Badge>Ai Skill</Badge>
                  </Card>
                </Column>
                <Column>
                  <Card title="Add skill" className={styles.cardAutomation}>
                    <Badge>+</Badge>
                  </Card>
                </Column>
              </Grid>
            </Card>

            <Column sm={12}>
              <Heading>Knowledge</Heading>
            </Column>

            <Card className={styles.backgroundCard}>
              <Grid className={styles.gridVerticalGap}>
                <Column>
                  <Card
                    title="www.livechat.com"
                    className={styles.cardAutomation}
                  >
                    <Badge>Website</Badge>
                  </Card>
                </Column>
                <Column>
                  <Card title="Pricing plans" className={styles.cardAutomation}>
                    <Badge>PDF</Badge>
                  </Card>
                </Column>
                <Column>
                  <Card title="Add knowledge" className={styles.cardAutomation}>
                    <Badge>+</Badge>
                  </Card>
                </Column>
              </Grid>
            </Card>
          </div>
        </Grid>
      </div>
    </GridWithVisualizer>
  ),
};

export const Example5SalesFunnelReportCardsWithArrows: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid align="center" justify="center">
        <Column sm={12} lg={3}>
          <Card title="Total chats" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>2870</Heading>
              <Badge>80</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column sm={12} md={1}>
          <Icon className={styles.arrowDown} source={ArrowDownward} />
          <Icon className={styles.arrowForward} source={ArrowForward} />
        </Column>

        <Column sm={12} lg={3}>
          <Card title="Sales conversion" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>45%</Heading>
              <Badge>12%</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column sm={12} md={1}>
          <Icon className={styles.arrowDown} source={ArrowDownward} />
          <Icon className={styles.arrowForward} source={ArrowForward} />
        </Column>
        <Column sm={12} lg={3}>
          <Card title="Sales value" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>$13,6k</Heading>
              <Badge>540</Badge>
            </div>
            <Text>vs $13k for prev. period</Text>
          </Card>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};
