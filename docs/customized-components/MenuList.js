import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
/* eslint-disable import/no-unresolved */
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';
import { getHash } from 'rsg-components/../utils/handleHash';
/* eslint-enable import/no-unresolved */

const styles = ({ color, fontFamily, fontSize, space, mq }) => ({
  list: {
    margin: 0,
    paddingLeft: space[2]
  },
  item: {
    color: color.base,
    display: 'block',
    margin: [[space[1], 0, space[1], 0]],
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    listStyle: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& a': {
      color: `${color.base} !important`
    }
  },
  isChild: {
    [mq.small]: {
      display: 'inline-block',
      margin: [[0, space[1], 0, 0]]
    }
  },
  isSelected: {
    '& > a': {
      color: `${color.link} !important`
    }
  },
  heading: {
    color: color.base,
    marginTop: space[1],
    fontFamily: fontFamily.base,
    fontWeight: 'bold'
  }
});

export function MenuList({ classes, items }) {
  const filteredItems = items.filter(item => item.visibleName);

  if (!filteredItems.length) {
    return null;
  }

  const windowHash = `/#${window.location.pathname}${getHash(
    window.location.hash
  )}`;

  return (
    <ul className={classes.list}>
      {items.map(
        ({ heading, visibleName, href, content, shouldOpenInNewTab }) => {
          const isItemSelected = windowHash === href;
          return (
            <li
              className={cx(classes.item, {
                [classes.isChild]:
                  (!content || !content.props.items.length) &&
                  !shouldOpenInNewTab,
                [classes.isSelected]: isItemSelected
              })}
              key={href}
            >
              <Link
                className={cx(heading && classes.heading)}
                href={href}
                target={shouldOpenInNewTab ? '_blank' : undefined}
              >
                {visibleName}
              </Link>
              {content}
            </li>
          );
        }
      )}
    </ul>
  );
}

MenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default Styled(styles)(MenuList);
