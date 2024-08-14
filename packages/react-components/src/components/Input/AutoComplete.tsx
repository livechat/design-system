import * as React from 'react';

import {
  FloatingNode,
  FloatingPortal,
  Placement,
  Strategy,
} from '@floating-ui/react';

import { IPickerListItem, PickerList } from '../Picker';
import { DEFAULT_LIST_HEIGHT, MIN_LIST_HEIGHT } from '../Picker/constants';
import { useFloatingPicker } from '../Picker/hooks/useFloatingPicker';
import { usePickerItems } from '../Picker/hooks/usePickerItems';

import { Input, InputProps } from './Input';

// selectedItemBody is unnecessary for AutoCompleteListItem, key should be === name
export type IAutoCompleteListItem = Omit<
  IPickerListItem,
  'key' | 'customElement'
> & {
  customElement?: React.ReactElement;
};

export interface AutoCompleteProps extends Omit<InputProps, 'type'> {
  /** Options that will be displayed in the picker. If they are strings, they will be converted to `IPickerListItem[]`*/
  options: string[] | IAutoCompleteListItem[];
  /** If true, disables filtering of the options. Useful for getting options from an external source.*/
  alwaysShowAllOptions?: boolean;
  /** If true, the autocomplete list will be open when the component mounts.*/
  autocompleteOpenOnInit?: boolean;
  /** Minimum height of the list */
  minListHeight?: number;
  /** Maximum height of the list */
  maxListHeight?: number;
  /** Placement of the list */
  placement?: Placement;
  /** Floating strategy */
  floatingStrategy?: Strategy;
}

const areAllOptionsStrings = (
  options: AutoCompleteProps['options']
): options is string[] => typeof options[0] === 'string'; // Assumption (backed by TS): if o[0] is a string, the rest are too.

const buildOptionsFromStrings = (options: string[]): IPickerListItem[] =>
  options.map((option) => ({ name: option, key: option }));

const buildOptionsFromAutoCompleteListItems = (
  options: IAutoCompleteListItem[]
): IPickerListItem[] =>
  options.map(({ customElement, name, ...rest }) => ({
    name,
    key: name,
    ...(customElement && {
      customElement: {
        listItemBody: customElement,
        selectedItemBody: <></>,
      },
    }),
    ...rest,
  }));

/**
 * Text input with autocomplete functionality. The autocomplete list is displayed below the input and is accessible via the keyboard
 * and mouse. The list is filtered based on the input value.
 *
 * @example
 * <AutoComplete
 *  options={['Paul', 'Adam', 'John']}
 *  placeholder="Type a name"
 * />
 */
export const AutoComplete = React.forwardRef<
  HTMLInputElement,
  AutoCompleteProps
>(
  (
    {
      disabled,
      minListHeight = MIN_LIST_HEIGHT,
      maxListHeight = DEFAULT_LIST_HEIGHT,
      autocompleteOpenOnInit = false,
      placement,
      options,
      readOnly,
      floatingStrategy,
      alwaysShowAllOptions = false,
      ...inputProps
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    React.useImperativeHandle(ref, () => inputRef.current!, []);

    const [value, setValue] = React.useState('');
    const isValueControlled = inputProps.value !== undefined;
    const inputValue = isValueControlled ? inputProps.value : value;

    const [isPickerOpen, setIsPickerOpen] = React.useState(
      autocompleteOpenOnInit
    );
    const handleVisibilityChange = (newValue: boolean) => {
      setIsPickerOpen(newValue);
    };

    const onFilter = (value: string) => {
      if (alwaysShowAllOptions) {
        return;
      }
      handleOnFilter(value);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      inputProps.onChange?.(event);
      setValue(event.target.value);
      onFilter(event.target.value);
      inputRef.current?.focus();
    };

    const handleAutoComplete = (value: { key: string }[] | null) => {
      if (value) {
        const key = value[0].key;
        handleValueChange({
          target: { value: key },
        } as React.ChangeEvent<HTMLInputElement>);

        // 0-timeout to ensure the input value is set before the picker is closed.
        setTimeout(() => {
          handleVisibilityChange(false);
        }, 0);
      }
    };

    const pickerOptions = React.useMemo(
      () =>
        areAllOptionsStrings(options)
          ? buildOptionsFromStrings(options)
          : buildOptionsFromAutoCompleteListItems(options),
      [options]
    );

    const { items, searchPhrase, handleOnFilter, handleSelect, selectedKeys } =
      usePickerItems({
        selected: [],
        // If there is only one option and it is already typed in, don't show it in the picker.
        options: pickerOptions,
        type: 'single',
        onSelect: handleAutoComplete,
        setOpen: setIsPickerOpen,
        clearSearchAfterSelection: true,
        inputRef,
      });

    const {
      nodeId,
      context,
      setFloating,
      getReferenceProps,
      getItemProps,
      getFloatingProps,
      floatingStyles,
      maxHeight,
      setPointer,
      setReference,
      virtualItemRef,
      listElementsRef,
      activeIndex,
    } = useFloatingPicker({
      openedOnInit: autocompleteOpenOnInit,
      disabled: disabled || readOnly,
      items,
      searchPhrase: alwaysShowAllOptions ? '' : searchPhrase,
      isOpen: isPickerOpen,
      onVisibilityChange: handleVisibilityChange,
      minListHeight,
      maxListHeight,
      placement,
      floatingStrategy,
    });

    return (
      <div ref={setReference} {...getReferenceProps()}>
        <Input
          {...inputProps}
          ref={inputRef}
          onChange={handleValueChange}
          onKeyDown={(e) => {
            if (virtualItemRef.current?.id && e.key === 'Enter') {
              handleAutoComplete([{ key: virtualItemRef.current?.id }]);
            }
            inputProps.onKeyDown?.(e);
          }}
          value={inputValue}
          disabled={disabled}
          readOnly={readOnly}
          type="text"
        />

        <FloatingNode id={nodeId}>
          {isPickerOpen && (
            <FloatingPortal>
              <PickerList
                context={context}
                options={items}
                setFloating={setFloating}
                getFloatingProps={getFloatingProps}
                floatingStyles={floatingStyles}
                maxHeight={maxHeight}
                listElementsRef={listElementsRef}
                activeIndex={activeIndex}
                selectedKeys={selectedKeys}
                setPointer={setPointer}
                hideWhenEmpty
                getItemProps={getItemProps}
                onSelect={handleSelect}
              />
            </FloatingPortal>
          )}
        </FloatingNode>
      </div>
    );
  }
);
