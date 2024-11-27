import { ReactElement } from 'react';

import { render, RenderResult, vi } from 'test-utils';

import { AppFrameProvider } from '../../../../providers';

import {
  NavigationTopBar,
  NavigationTopBarAlert,
  NavigationTopBarTitle,
} from './NavigationTopBar';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
    };
  };

let providerWrapper: (el: ReactElement) => RenderResult;

beforeEach(() => {
  providerWrapper = (el) => render(<AppFrameProvider>{el}</AppFrameProvider>);
});

describe('<NavigationTopBar> component', () => {
  it('should render children', () => {
    const { getByText } = providerWrapper(
      <NavigationTopBar>
        <div>Child</div>
      </NavigationTopBar>
    );

    expect(getByText('Child')).toBeInTheDocument();
  });

  it('should render additional nodes', () => {
    const { getByText } = providerWrapper(
      <NavigationTopBar
        additionalNodes={<div>Top content</div>}
      ></NavigationTopBar>
    );

    expect(getByText('Top content')).toBeInTheDocument();
  });

  it('should render title', () => {
    const { getByText } = providerWrapper(
      <NavigationTopBar
        additionalNodes={
          <NavigationTopBarTitle>Page title</NavigationTopBarTitle>
        }
      ></NavigationTopBar>
    );

    expect(getByText('Page title')).toBeInTheDocument();
  });
});

describe('<NavigationTopBarAlert> component', () => {
  it('should render children', () => {
    const { getByText } = providerWrapper(
      <NavigationTopBarAlert isVisible={true}>Alert</NavigationTopBarAlert>
    );

    expect(getByText('Alert')).toBeInTheDocument();
  });

  it('should render CTAs when provided', () => {
    const { getByText } = providerWrapper(
      <NavigationTopBarAlert
        isVisible={true}
        primaryCta={{ label: 'Primary', onClick: vi.fn() }}
        secondaryCta={{ label: 'Secondary', onClick: vi.fn() }}
      >
        Alert
      </NavigationTopBarAlert>
    );

    expect(getByText('Primary')).toBeInTheDocument();
    expect(getByText('Secondary')).toBeInTheDocument();
  });

  it('should render close button when provided', () => {
    const { getByLabelText } = providerWrapper(
      <NavigationTopBarAlert
        isVisible={true}
        closeButton={{ onClick: vi.fn(), 'aria-label': 'Close' }}
      >
        Alert
      </NavigationTopBarAlert>
    );

    expect(getByLabelText('Close')).toBeInTheDocument();
  });

  it('should remove elements from the DOM when isVisible set to false', () => {
    const { queryByText } = providerWrapper(
      <NavigationTopBarAlert isVisible={false}>Alert</NavigationTopBarAlert>
    );

    expect(queryByText('Alert')).not.toBeInTheDocument();
  });
});
