import * as React from 'react';

import { ArrowForward, ArrowDownward } from '@livechat/design-system-icons';

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
        <Column sm={4} md={4} lg={4}>
          <Box>Column 1 (always 4 columns)</Box>
        </Column>
        <Column sm={2} md={4} lg={8}>
          <Box>Column 2 (always 50%)</Box>
        </Column>
        <Column>
          <Box>Column 3 (flexible)</Box>
        </Column>
        <Column>
          <Box>Column 4 (flexible)</Box>
        </Column>
        <Column sm={4}>
          <Box>Column 5 (always full width)</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const FixedColumnPercentageSizes: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <Box>Full width</Box>
        </Column>
        <Column sm={2} md={4} lg={8}>
          <Box>1/2</Box>
        </Column>
        <Column sm={2} md={4} lg={8}>
          <Box>1/2</Box>
        </Column>
        <Column sm={1} md={4} lg={4}>
          <Box>1/4</Box>
        </Column>
        <Column sm={1} md={4} lg={4}>
          <Box>1/4</Box>
        </Column>
        <Column sm={1} md={4} lg={4}>
          <Box>1/4</Box>
        </Column>
        <Column sm={1} md={4} lg={4}>
          <Box>1/4</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={4} md={4} lg={8}>
          <Box>
            sm=4 md=4 lg=8
            <br />
            (Full width on small, half on medium and large)
          </Box>
        </Column>
        <Column sm={4} md={4} lg={8}>
          <Box>
            sm=4 md=4 lg=8
            <br />
            (Full width on small, half on medium and large)
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
        <Column sm={2} md={4} lg={8}>
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
        <Column lg={8}>
          <Box>
            Outer Grid (8 columns)
            <Grid>
              <Column lg={8}>
                <Box>
                  Inner Grid (8 inner grid columns,1/2 of parent = 4 outer
                  columns)
                </Box>
              </Column>
              <Column lg={8}>
                <Box>
                  Inner Grid (8 inner grid columns, 1/2 of parent = 4 outer
                  columns)
                </Box>
              </Column>
            </Grid>
          </Box>
        </Column>
        <Column lg={4}>
          <Box>Outer Grid (4 columns)</Box>
        </Column>
        <Column lg={4}>
          <Box>Outer Grid (4 columns)</Box>
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

export const BreakpointInheritance: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column sm={4}>
          <Box>
            sm=4 only
            <br />
            (100% width that persists across all breakpoints)
          </Box>
        </Column>
        <Column lg={8}>
          <Box>
            lg=8 only
            <br />
            (Flexible until lg, then 50% width)
          </Box>
        </Column>
        <Column sm={1} lg={8}>
          <Box>
            sm=1, lg=8
            <br />
            (25% on small, stays 25% on medium, becomes 50% on large)
          </Box>
        </Column>
        <Column sm={2} md={6} lg={4}>
          <Box>
            sm=2, md=6, lg=4
            <br />
            (50% → 75% → 25%)
          </Box>
        </Column>
      </Grid>
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: 'var(--surface-basic-disabled)',
        }}
      >
        <p>Breakpoint behavior:</p>
        <ul>
          <li>Default state: columns are flexible (flex: 1 1 auto)</li>
          <li>
            When a breakpoint is set: width is fixed and persists until
            overwritten
          </li>
          <li>
            No automatic "reverting" to flexible layout after a breakpoint
          </li>
        </ul>
        <p>In this example:</p>
        <ul>
          <li>
            First row: Shows how sm=4 (100%) persists across all breakpoints
          </li>
          <li>
            Second row: Shows default flexible behavior until lg breakpoint
          </li>

          <li>
            Last row: Shows explicit transitions between breakpoints (sm=2 →
            md=6 → lg=4)
          </li>
        </ul>
      </div>
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
            <Column sm={1}>
              <Box style={{ height: '100px' }}>Tall</Box>
            </Column>
            <Column sm={1}>
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

export const NestedGridWithAlignment: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid justify="center">
        <Column lg={12}>
          <Box>
            <p>Outer Grid centered (12 columns)</p>
            <Grid justify="center">
              <Column lg={6}>
                <Box>Inner Grid centered (6 inner grid columns)</Box>
              </Column>
              <Column lg={2}>
                <Box>Inner Grid centered (2 inner grid columns)</Box>
              </Column>
            </Grid>
          </Box>
        </Column>
        <Column lg={8}>
          <Box>
            <p>Outer Grid centered (8 columns)</p>
            <Grid justify="space-between">
              <Column lg={4}>
                <Box>Inner Grid spaced-between (4 inner grid columns)</Box>
              </Column>
              <Column lg={4}>
                <Box>Inner Grid spaced-between (4 inner grid columns)</Box>
              </Column>
            </Grid>
          </Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const ColumnSizing: Story = {
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
      <Grid className={styles.gridVerticalGap}>
        <Column sm={4} md="auto">
          <Card title="Total chats" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>2870</Heading>
              <Badge>80</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column sm={4} md="auto">
          <Card title="Sales conversion" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>45%</Heading>
              <Badge>12%</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column sm={4} md="auto">
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
      <Grid className={styles.gridVerticalGap}>
        <Column sm={4} md={4} lg={4}>
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
        <Column sm={4} md={4} lg={4}>
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
        <Column sm={4} md={4} lg={4}>
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
        <Column sm={4} md={4} lg={4}>
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
        <div className={styles.gridWrapper}>
          <Column sm={4}>
            <Heading>Skills</Heading>
          </Column>

          <Card className={styles.backgroundCard}>
            <Grid className={styles.gridVerticalGap}>
              <Column sm={4} md="auto">
                <Card title="Welcome message" className={styles.cardAutomation}>
                  <Badge>Ai Skill</Badge>
                </Card>
              </Column>
              <Column sm={4} md="auto">
                <Card
                  title="Order management"
                  className={styles.cardAutomation}
                >
                  <Badge>Ai Skill</Badge>
                </Card>
              </Column>
              <Column sm={4} md="auto">
                <Card title="Add skill" className={styles.cardAutomation}>
                  <Badge>+</Badge>
                </Card>
              </Column>
            </Grid>
          </Card>

          <Column sm={4}>
            <Heading>Knowledge</Heading>
          </Column>

          <Card className={styles.backgroundCard}>
            <Grid className={styles.gridVerticalGap}>
              <Column sm={4} md="auto">
                <Card
                  title="www.livechat.com"
                  className={styles.cardAutomation}
                >
                  <Badge>Website</Badge>
                </Card>
              </Column>
              <Column sm={4} md="auto">
                <Card title="Pricing plans" className={styles.cardAutomation}>
                  <Badge>PDF</Badge>
                </Card>
              </Column>
              <Column sm={4} md="auto">
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
          <div className={styles.gridWrapper}>
            <Column sm={4}>
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

            <Column sm={4}>
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
      <Grid className={styles.gridVerticalGap}>
        <Column sm={4} lg="auto">
          <Card title="Total chats" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>2870</Heading>
              <Badge>80</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column className={styles.arrowDown}>
          <Icon source={ArrowDownward} />
        </Column>
        <Column width="fit-content" className={styles.arrowForward}>
          <Icon source={ArrowForward} />
        </Column>
        <Column sm={4} lg="auto">
          <Card title="Sales conversion" className={styles.card}>
            <div className={styles.cardContent}>
              <Heading>45%</Heading>
              <Badge>12%</Badge>
            </div>
            <Text>vs 2790 for prev. period</Text>
          </Card>
        </Column>
        <Column className={styles.arrowDown}>
          <Icon source={ArrowDownward} />
        </Column>
        <Column width="fit-content" className={styles.arrowForward}>
          <Icon source={ArrowForward} />
        </Column>
        <Column sm={4} lg="auto">
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
