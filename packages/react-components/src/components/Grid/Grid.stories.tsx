import * as React from 'react';

import { GridVisualizer } from './components/GridVisualizer/GridVisualizer';
import { ToggleSwitch } from './components/GridVisualizer/ToggleSwitch';

import { Grid, Row, Column } from './index';

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
        <Row>
          <Column lg={16}>
            <Box>Full width</Box>
          </Column>
        </Row>
        <Row>
          <Column sm={2} md={4} lg={8}>
            <Box>1/2</Box>
          </Column>
          <Column sm={2} md={4} lg={8}>
            <Box>1/2</Box>
          </Column>
        </Row>
        <Row>
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
        </Row>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Row>
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
        </Row>
        <Row>
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
        </Row>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const AutoColumns: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Row>
          <Column>
            <Box>Auto width</Box>
          </Column>
          <Column>
            <Box>Auto width</Box>
          </Column>
          <Column>
            <Box>Auto width</Box>
          </Column>
        </Row>
        <Row>
          <Column sm={2} md={4} lg={8}>
            <Box>Fixed width 50%</Box>
          </Column>
          <Column>
            <Box>Auto width</Box>
          </Column>
        </Row>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const NestedGrid: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Row>
          <Column sm={4} md={8} lg={16}>
            <Box>
              <p>Outer Grid</p>
              <Row>
                <Column sm={4} md={4} lg={8}>
                  <Grid>
                    <Row>
                      <Column sm={2} md={2} lg={4}>
                        <Box>Nested 1</Box>
                      </Column>
                      <Column sm={2} md={2} lg={4}>
                        <Box>Nested 2</Box>
                      </Column>
                    </Row>
                  </Grid>
                </Column>
                <Column sm={4} md={4} lg={8}>
                  <Grid>
                    <Row>
                      <Column sm={2} md={2} lg={4}>
                        <Box>Nested 3</Box>
                      </Column>
                      <Column sm={2} md={2} lg={4}>
                        <Box>Nested 4</Box>
                      </Column>
                    </Row>
                  </Grid>
                </Column>
              </Row>
            </Box>
          </Column>
        </Row>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const ThreeColumnExample: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Row>
          <Column sm={2} md={2} lg={4}>
            <Box>Fixed Left (lg-4 columns, md-2 columns, sm-2 columns)</Box>
          </Column>
          <Column>
            <Box>Auto-adjusting Middle</Box>
          </Column>
          <Column sm={2} md={2} lg={4}>
            <Box>Fixed Right (lg-4 columns, md-2 columns, sm-2 columns)</Box>
          </Column>
        </Row>
      </Grid>
    </GridWithVisualizer>
  ),
};

export const FixedPixelWidthColumns: Story = {
  render: () => (
    <GridWithVisualizer>
      <Grid>
        <Row>
          <Column style={{ flex: '0 0 200px' }}>
            <Box>Fixed Left (200px)</Box>
          </Column>
          <Column>
            <Box>Auto-adjusting Middle</Box>
          </Column>
          <Column style={{ flex: '0 0 200px' }}>
            <Box>Fixed Right (200px)</Box>
          </Column>
        </Row>
      </Grid>
    </GridWithVisualizer>
  ),
};
