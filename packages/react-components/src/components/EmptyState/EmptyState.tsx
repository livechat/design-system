import { Display, Heading, Text } from '../Typography';

import * as styles from './styles';
import { IEmptyStateProps } from './types';

export const EmptyState = ({
  type = 'full',
  image,
  icon,
  title,
  description,
  actions,
  centered = false,
}: IEmptyStateProps) => {
  return (
    <div className={styles.emptyState(type, centered)}>
      {image && (
        <img className={styles.emptyStateImage} src={image} alt={title} />
      )}
      {type === 'inline' ? (
        <div className={styles.emptyStateContentInline}>
          {icon && <Display data-testid="icon">{icon}</Display>}
          <Text noMargin>{title}</Text>
        </div>
      ) : (
        <>
          {icon && (
            <Display className={styles.emptyStateIcon(type)} data-testid="icon">
              {icon}
            </Display>
          )}
          <Heading className={styles.emptyStateTitle}>{title}</Heading>
        </>
      )}

      {type === 'full' && description && (
        <Text noMargin className={styles.emptyStateDescription}>
          {description}
        </Text>
      )}
      {actions && (
        <div className={styles.emptyStateActions(type)}>{actions}</div>
      )}
    </div>
  );
};
