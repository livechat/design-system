import { KeyCodes } from '../../utils/keyCodes';
import escape from 'lodash.escape';
import { RefObject, FC, useState, KeyboardEvent, ClipboardEvent } from 'react';

export interface EditableTagContentProps {
  value: string;
  className?: string;
  innerEditableRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  change: (value: string) => void;
  remove: () => void;
  validator?: (value: string) => boolean;
}

export const EditableTagContent: FC<EditableTagContentProps> = ({
  className = '',
  innerEditableRef,
  inputRef,
  change,
  remove,
  value,
}) => {
  const [removed, setRemoved] = useState(false);

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

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === KeyCodes.enter) {
      e.preventDefault();
      focusInputRef();
      return;
    }

    if (e.key === KeyCodes.backspace && getValue() === '') {
      setRemoved(true);
      remove();
      focusInputRef();
    }
  };

  const onBlur = () => {
    const ref = getRef();
    if (removed || !ref) {
      return;
    }
    if (ref.innerText === '') {
      remove();
      return;
    }
    change(ref.innerText);
  };

  const onPaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, escape(text));
  };

  return (
    <div
      ref={innerEditableRef}
      className={className}
      contentEditable={true}
      onPaste={onPaste}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      dangerouslySetInnerHTML={{ __html: escape(value) }}
    />
  );
};
