import * as React from 'react';

import { FloatingNode, FloatingPortal } from '@floating-ui/react';

import noop from '../../utils/noop';
import { Input } from '../Input';
import { IPickerListItem, PickerList } from '../Picker';
import { DEFAULT_LIST_HEIGHT, MIN_LIST_HEIGHT } from '../Picker/constants';
import { useFloatingPicker } from '../Picker/hooks/useFloatingPicker';
import { usePickerItems } from '../Picker/hooks/usePickerItems';

import {
  areAllOptionsStrings,
  buildOptionsFromAutoCompleteListItems,
  buildOptionsFromStrings,
  getFilteredPickerItems,
} from './helpers';
import { AutoCompleteProps } from './types';

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
      single,
      alwaysShowAllOptions,
      hideIfExactMatch = true,
      ...inputProps
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
     
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
      handleOnFilter(value);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      inputProps.onChange?.(event);
      setValue(event.target.value);
      if (!alwaysShowAllOptions) {
        onFilter(event.target.value);
      }
      inputRef.current?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      handleVisibilityChange(true);
      if (virtualItemRef.current?.id && event.key === 'Enter') {
        handleAutoComplete([{ key: virtualItemRef.current?.id }]);
      }
      inputProps.onKeyDown?.(event);
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

    const pickerOptions = React.useMemo((): IPickerListItem[] => {
      if (!options) {
        return [];
      }

      return areAllOptionsStrings(options)
        ? buildOptionsFromStrings(options)
        : buildOptionsFromAutoCompleteListItems(options);
    }, [options]);

    const { items, searchPhrase, handleOnFilter, handleSelect, selectedKeys } =
      usePickerItems({
        selected: [],
        options: pickerOptions,
        type: 'single',
        onSelect: handleAutoComplete,
        setOpen: setIsPickerOpen,
        clearSearchAfterSelection: true,
        inputRef,
      });

    const filteredPickerItems = getFilteredPickerItems(
      items,
      single || false,
      hideIfExactMatch || false,
      inputValue?.toString() || ''
    );

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
      isPositioned,
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
          onKeyDown={handleKeyDown}
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
                options={filteredPickerItems}
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
                isPositioned={isPositioned}
                searchDisabled={false}
                onItemRemove={noop}
              />
            </FloatingPortal>
          )}
        </FloatingNode>
      </div>
    );
  }
);
