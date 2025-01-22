import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/react-dom';
import cx from 'clsx';

import { IUserGuide } from './types';
import VirtualReference from './virtualElementReference';

import styles from './UserGuide.module.scss';

const baseClass = 'user-guide';

const virtualReference = (element: Element, padding: number = 0) =>
  new VirtualReference(element, padding);

export const UserGuide: FC<PropsWithChildren<IUserGuide>> = ({
  className,
  children,
  cursorPosition = 'bottom',
  cursorTiming = 'fast2',
  parentElementName,
  isVisible = false,
  elementStyles,
}) => {
  const [parentElement, setParentElement] = useState<Element | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { refs, x, y, strategy, placement, update } = useFloating({
    middleware: [shift(), flip()],
    placement: cursorPosition,
    open: true,
    whileElementsMounted: autoUpdate,
  });

  const handleViewportChange = () => {
    if (parentElement) {
      setRect(
        virtualReference(parentElement).getBoundingClientRect() as DOMRect
      );
    }
  };

  useEffect(() => {
    if (parentElement !== null) {
      window.addEventListener('resize', handleViewportChange);
      window.addEventListener('scroll', handleViewportChange);

      return () => {
        window.removeEventListener('resize', handleViewportChange);
        window.removeEventListener('scroll', handleViewportChange);
      };
    }
  }, [parentElement]);

  useEffect(() => {
    const handleResize = () => update();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [update]);

  useEffect(() => {
    if (parentElementName) {
      const element = document.querySelector(parentElementName);
      setParentElement(element);
      refs.setReference(element);
    }
  }, [parentElementName]);

  useEffect(() => {
    parentElement &&
      setRect(
        virtualReference(parentElement).getBoundingClientRect() as DOMRect
      );
  }, [parentElement]);

  useEffect(() => {
    if (parentElement && containerRef.current) {
      containerRef.current.innerHTML = '';
      const clonedElement = parentElement.cloneNode(true) as HTMLElement;
      Object.assign(clonedElement.style, elementStyles);
      containerRef.current.appendChild(clonedElement);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [parentElement, containerRef.current, isVisible]);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('user-guide-visible');
    } else {
      document.body.classList.remove('user-guide-visible');
    }

    return () => {
      document.body.classList.remove('user-guide-visible');
    };
  }, [isVisible]);

  const cloneReferenceElement = () => {
    if (!rect) return null;

    return (
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          pointerEvents: 'none',
        }}
      />
    );
  };

  return parentElement ? (
    <>
      <div
        className={cx(styles[`${baseClass}__overlay`])}
        style={{
          display: isVisible ? 'block' : 'none',
        }}
      >
        {cloneReferenceElement()}
      </div>
      {isVisible && rect && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className={cx(
              styles[`${baseClass}__floating`],
              styles[`${baseClass}__floating--${cursorTiming}`],
              className
            )}
          >
            <div ref={contentRef} className={styles[`${baseClass}__guide`]}>
              <div
                className={cx(
                  styles[`${baseClass}__guide__arrow`],
                  styles[`${baseClass}__guide__arrow--${placement}`],
                  styles[`${baseClass}__guide__arrow--${cursorTiming}`]
                )}
              >
                <svg
                  width="40"
                  height="43"
                  viewBox="0 0 40 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_2511_27812)">
                    <path
                      d="M12.1399 28.6143L20.0002 10.6475L27.8604 28.6143L20.0002 25.3255L12.1399 28.6143Z"
                      fill="#050505"
                    />
                    <path
                      d="M20.9164 10.2467C20.7572 9.88266 20.3976 9.64746 20.0002 9.64746C19.6029 9.64746 19.2433 9.88266 19.0841 10.2466L11.2237 28.2134C11.0599 28.5879 11.1404 29.0243 11.4271 29.3156C11.7138 29.607 12.1488 29.6945 12.5259 29.5368L20.0002 26.4095L27.4744 29.5368C27.8514 29.6945 28.2865 29.607 28.5731 29.3156C28.8598 29.0243 28.9403 28.5879 28.7765 28.2135L20.9164 10.2467Z"
                      stroke="url(#paint0_linear_2511_27812)"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2511_27812"
                      x="0.139893"
                      y="0.647461"
                      width="39.7205"
                      height="41.9668"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2511_27812"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2511_27812"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_2511_27812"
                      x1="19"
                      y1="37"
                      x2="19.9864"
                      y2="9.0268"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.318907" stop-color="#CE97FE" />
                      <stop offset="0.456699" stop-color="#7000FF" />
                      <stop offset="0.690444" stop-color="#00B3FF" />
                      <stop offset="0.955729" stop-color="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {children && (
                <div
                  key={parentElementName}
                  className={cx(
                    styles[`${baseClass}__guide__content`],
                    styles[`${baseClass}__guide__content--${placement}`],
                    styles[`${baseClass}__guide__content--${cursorTiming}`]
                  )}
                >
                  {children}
                </div>
              )}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  ) : null;
};
