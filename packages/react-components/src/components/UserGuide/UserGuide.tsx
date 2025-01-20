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
  const [wasVisible, setWasVisible] = useState(false);
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
    if (wasVisible && isVisible) {
      setWasVisible(false);
    }
  }, [children]);

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
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_505_39896)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.0087 31.7805C19.5674 32.4164 18.7988 32.7405 18.0354 32.6127C17.272 32.4849 16.6509 31.9281 16.4408 31.1831L10.7998 11.1831C10.5897 10.4382 10.8282 9.63888 11.4123 9.13099C11.9963 8.6231 12.821 8.49779 13.5295 8.80926L33.3151 17.5069C34.0599 17.8343 34.5321 18.5802 34.5094 19.3935C34.4868 20.2068 33.9737 20.9252 33.2118 21.2107L25.283 24.181L20.0087 31.7805Z"
                      fill="url(#paint0_radial_505_39896)"
                    />
                  </g>
                  <g filter="url(#filter1_d_505_39896)">
                    <path
                      d="M18.3195 30.5181L23.95 22.4052L32.464 19.2157L12.6785 10.5181L18.3195 30.5181Z"
                      fill="#3A3C3F"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_505_39896"
                      x="0.724609"
                      y="0.640137"
                      width="43.7856"
                      height="44"
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
                        result="effect1_dropShadow_505_39896"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_505_39896"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_d_505_39896"
                      x="2.67847"
                      y="2.51807"
                      width="39.7855"
                      height="40"
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
                        result="effect1_dropShadow_505_39896"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_505_39896"
                        result="shape"
                      />
                    </filter>
                    <radialGradient
                      id="paint0_radial_505_39896"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(6.70389 6.16367) rotate(38.3159) scale(46.1147 46.1147)"
                    >
                      <stop offset="0.130208" stop-color="#C930FF" />
                      <stop offset="0.333333" stop-color="white" />
                      <stop offset="0.546875" stop-color="#00B3FF" />
                      <stop offset="0.998752" stop-color="#7000FF" />
                    </radialGradient>
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
