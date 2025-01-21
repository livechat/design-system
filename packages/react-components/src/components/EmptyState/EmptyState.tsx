import { Icon } from '../Icon';
import { Heading, Text } from '../Typography';

import { IEmptyStateProps } from './types';

export const EmptyState = (props: IEmptyStateProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: props.type === 'inline' ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: props.type === 'inline' ? 'space-between' : 'center',
        gap: '16px',
      }}
    >
      {props.image && <img src={props.image} alt={props.title} />}
      {props.type === 'inline' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {props.icon && <Icon source={props.icon} />}
          <Text>{props.title}</Text>
        </div>
      ) : (
        <>
          {props.icon && <Icon size="xlarge" source={props.icon} />}
          <Heading style={{ margin: '0' }}>{props.title}</Heading>
        </>
      )}

      <div>
        {props.type === 'full' && props.description && (
          <div>{props.description}</div>
        )}
      </div>
      {props.actions && (
        <div style={{ display: 'flex', gap: '8px' }}>{props.actions}</div>
      )}
    </div>
  );
};
