import * as React from 'react';

import { GridVisualizer } from './components/GridVisualizer/GridVisualizer';
import { ToggleSwitch } from './components/GridVisualizer/ToggleSwitch';

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
const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: 'var(--surface-basic-active)',
      border: '1px solid var(--content-locked-black)',
      textAlign: 'center',
      height: '100%',
      minHeight: '50px',
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
        <Column sm={4} md={4}>
          <Box>Column 1</Box>
        </Column>
        <Column lg={8}>
          <Box>Column 2</Box>
        </Column>
        <Column>
          <Box>Column 3</Box>
        </Column>
        <Column>
          <Box>Column 4</Box>
        </Column>
        <Column>
          <Box>Column 5</Box>
        </Column>
        <Column>
          <Box>Column 6</Box>
        </Column>
        <Column>
          <Box>Column 7</Box>
        </Column>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const FixedColumnSizes: Story = {
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

export const FixedPixelWidthColumns: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Column style={{ flex: '0 0 200px' }}>
          <Box>Fixed Left (200px)</Box>
        </Column>
        <Column>
          <Box>Auto-adjusting Middle</Box>
        </Column>
        <Column style={{ flex: '0 0 200px' }}>
          <Box>Fixed Right (200px)</Box>
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
