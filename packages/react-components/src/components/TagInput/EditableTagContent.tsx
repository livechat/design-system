import * as React from 'react';
import { KeyCodes } from '../../constants/keyCodes';
import cx from 'classnames';
import { escape } from 'lodash';

export interface IEditableTagContentProps {
  value: string;
  className?: string;
  innerEditableRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  change: (value: string) => void;
  remove: () => void;
  validator?: (value: string) => boolean;
}

export const EditableTagContent: React.FC<IEditableTagContentProps> = ({
  className = '',
  innerEditableRef,
  inputRef,
  change,
  remove,
  value,
}) => {
  const mergedClassNames = cx(className);

  const [removed, setRemoved] = React.useState(false);

  const getRef = () => innerEditableRef.current;

  const getValue = () => {
    const ref = getRef();
    return ref ? ref.innerText : '';
  };

  const focusInputRef = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === KeyCodes.enter) {
      e.preventDefault();
      focusInputRef();
      return;
    }

    const value = getValue();
    if (e.key === KeyCodes.backspace && value === '') {
      setRemoved(true);
      remove();
      focusInputRef();
      return;
    }
  };

  const onBlur = () => {
    const ref = getRef();
    if (!removed && ref) {
      if (ref.innerText === '') {
        remove();
        return;
      }

      change(ref.innerText);
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, escape(text));
  };

  return (
    <div
      ref={innerEditableRef}
      className={mergedClassNames}
      contentEditable={true}
      onPaste={onPaste}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      dangerouslySetInnerHTML={{ __html: escape(value) }}
    />
  );
};
