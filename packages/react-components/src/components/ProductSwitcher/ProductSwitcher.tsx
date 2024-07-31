import { FC, MouseEvent } from 'react';
import * as React from 'react';

import {
  autoUpdate,
  FloatingNode,
  FloatingTree,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { TextLogoFull } from '@livechat/design-system-icons';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Text } from '../Typography';

import { ProductRow } from './components/ProductRow/ProductRow';
import { ProductTile } from './components/ProductTile/ProductTile';
import { IProductSwitcherProps } from './types';

import styles from './ProductSwitcher.module.scss';

const baseClass = 'product-switcher';

export const ProductSwitcher: FC<IProductSwitcherProps> = ({
  productOptions,
  mainProductId,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const parentId = useFloatingParentNodeId();
  const nodeId = useFloatingNodeId();

  const { refs, context, floatingStyles } = useFloating({
    nodeId,
    strategy: 'fixed',
    placement: 'right-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset({ mainAxis: 10 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context);
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    common: {
      transformOrigin: 'left top',
    },
    initial: {
      opacity: 0,
      transform: 'scale(0.84) translateX(-22px)',
    },
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const mainProduct = productOptions.find(
    (product) => product.id === mainProductId
  );

  if (!mainProduct) {
    return null;
  }

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  const combinedNotificationCount = productOptions.reduce(
    (acc, product) => acc + (product.notificationCount || 0),
    0
  );

  const ProductSwitcherComponent = (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <Tooltip
          isVisible={false}
          offsetCrossAxis={2}
          arrowOffsetY={2}
          offsetMainAxis={10}
          className={styles[`${baseClass}__tooltip`]}
          placement="right"
          triggerRenderer={
            <ProductTile
              isMainProduct
              icon={mainProduct.icon}
              iconColor={mainProduct.iconColor}
              backgroundColors={mainProduct.backgroundColors}
              notificationCount={combinedNotificationCount}
            />
          }
        >
          Switch product
        </Tooltip>
      </div>
      <FloatingNode id={nodeId}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {isMounted && (
            <div className={styles[baseClass]} style={transitionStyles}>
              <div className={styles[`${baseClass}__content`]}>
                {productOptions.map((product) => (
                  <ProductRow
                    key={product.id}
                    isActive={product.id === mainProductId}
                    product={product}
                    onClick={handleClick}
                  />
                ))}
              </div>
              <div className={styles[`${baseClass}__footer`]}>
                <a
                  href="https://www.text.com"
                  target="_blank"
                  className={styles[`${baseClass}__footer-link`]}
                >
                  <Text noMargin>powered by</Text>
                  <Icon
                    size="xlarge"
                    source={TextLogoFull}
                    customColor="var(--content-locked-white)"
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </FloatingNode>
    </>
  );

  if (parentId === null) {
    return <FloatingTree>{ProductSwitcherComponent}</FloatingTree>;
  }

  return ProductSwitcherComponent;
};
