import * as React from 'react';
import * as PropTypes from 'prop-types';
import { format, subDays } from 'date-fns';
import { DateUtils } from 'react-day-picker';
import SelectField from '../SelectField/SelectField';
import { Input } from '../InputField';
// import classNames from 'classnames/bind';
import styles from './style.scss';
import DatePicker from './DatePicker';

// import getMergedClassNames from '../../utils/getMergedClassNames';

// const baseClass = 'date-picker';
// const cx = classNames.bind(styles);

const initialState = {
  selectedItem: null,
  fromInputValue: '',
  toInputValue: '',
  from: undefined,
  to: undefined,
  error: null,
  enteredTo: null
};

class SelectDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.items = [
      {
        key: 'today',
        props: { name: 'Today', value: new Date() }
      },
      {
        key: 'yesterday',
        props: { name: 'Yesterday', value: subDays(new Date(), 1) }
      },
      {
        key: 'custom_date',
        props: { name: 'Custom date', value: 'custom_date' }
      }
    ];
    this.state = initialState;
  }

  getItemBody = props => <div id={props.value}>{props.name}</div>;

  getSelectedItemBody = props => {
    if (props.value === 'custom_date') {
      return (
        <div>
          <Input
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{ padding: '0 5px' }}
            size={10}
            placeholder="YYYY-MM-DD"
            onChange={this.handleFromDateChange}
            value={this.state.fromInputValue}
          />
          <span> - </span>
          <Input
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{ padding: '0 5px' }}
            size={10}
            placeholder="YYYY-MM-DD"
            onChange={this.handleToDateChange}
            value={this.state.toInputValue}
          />
        </div>
      );
    }
    return <div id={props.value}>{props.name}</div>;
  };

  handleDayClick = day => {
    const { from, to } = this.state;

    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        fromInputValue: format(day, 'YYYY-MM-DD'),
        enteredTo: null
      });
    } else {
      this.setState(
        {
          to: day,
          toInputValue: format(day, 'YYYY-MM-DD'),
          enteredTo: day
        },
        () => {
          const optionsHash = this.items.reduce(
            (acc, option) => ({ ...acc, [option.key]: option }),
            {}
          );
          this.props.onChange({
            ...optionsHash.custom_date,
            props: {
              ...optionsHash.custom_date.props,
              value: {
                from: this.state.from,
                to: this.state.to
              }
            }
          });
        }
      );
    }
  };

  handleItemSelect = item => {
    if (item === null) {
      this.setState({ ...initialState }, () => {
        this.props.onChange(null);
      });
    } else {
      this.setState(
        { selectedItem: item },
        () => {
          if (item !== 'custom_date') {
            const optionsHash = this.items.reduce(
              (acc, option) => ({ ...acc, [option.key]: option }),
              {}
            );
            this.props.onChange(optionsHash[item]);
          }
        },
        () => {
          const optionsHash = this.items.reduce(
            (acc, option) => ({ ...acc, [option.key]: option }),
            {}
          );
          this.props.onChange({
            ...optionsHash.custom_date,
            props: {
              ...optionsHash.custom_date.props,
              value: {
                from: this.state.from,
                to: this.state.to
              }
            }
          });
        }
      );
    }
  };

  handleFromDateChange = e => {
    const { value } = e.target;
    const error =
      this.isValidDateInInput(value) && this.state.to !== undefined
        ? null
        : 'not valid';
    if (DateUtils.isDate(new Date(value))) {
      this.setState(
        {
          fromInputValue: error ? undefined : value,
          from: new Date(value),
          enteredTo: null,
          error
        },
        () => {
          if (!error) {
            this.datePickerRef.current.showMonth(this.state.from);
            this.props.onChange({
              from: this.state.from,
              to: this.state.to
            });
          }
        }
      );
    } else {
      this.setState({ fromInputValue: value });
    }
  };

  handleToDateChange = e => {
    const { value } = e.target;
    const error =
      this.isValidDateInInput(value) && this.state.from !== undefined
        ? null
        : 'not valid';
    if (DateUtils.isDate(new Date(value))) {
      this.setState(
        {
          toInputValue: error ? undefined : value,
          to: new Date(value),
          enteredTo: new Date(value),
          error
        },
        () => {
          if (!error) {
            this.datePickerRef.current.showMonth(this.state.to);
            this.props.onChange({
              from: this.state.from,
              to: this.state.to
            });
          }
        }
      );
    } else {
      this.setState({ toInputValue: value });
    }
  };

  handlePrevYearClick = () => {
    this.datePickerRef.current.showPreviousYear();
  };

  handleDayMouseEnter = day => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  };

  isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  isValidDateInInput = inputValue => {
    if (
      inputValue.match(
        /^(?:(19|20)[0-9]{2})[\- \/.](0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])$/
      )
    ) {
      return true;
    }
    return false;
  };

  datePickerRef = React.createRef();

  render() {
    const modifiers = {
      [styles['date-picker__day--start']]: this.state.from,
      [styles['date-picker__day--end']]: this.state.enteredTo,
      [styles['date-picker__day--monday']]: { daysOfWeek: [1] },
      [styles['date-picker__day--sunday']]: { daysOfWeek: [0] }
    };

    return (
      <div style={{ width: '340px' }}>
        <SelectField
          id="date-select"
          items={this.items}
          searchProperty="name"
          onItemSelect={this.handleItemSelect}
          getItemBody={this.getItemBody}
          search
          error={this.state.error}
          selectedItemRenderer={selectedItemProps =>
            this.getSelectedItemBody(selectedItemProps)
          }
          placeholder="Select option"
          getSelectedItemBody={this.getSelectedItemBody}
          selected={this.state.selectedItem}
          searchPlaceholder="Search..."
        />
        {this.state.selectedItem === 'custom_date' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px 0'
            }}
          >
            <DatePicker
              ref={this.datePickerRef}
              onDayClick={this.handleDayClick}
              selectedDays={[
                this.state.from,
                { from: this.state.from, to: this.state.enteredTo }
              ]}
              // month={this.state.from}
              modifiers={modifiers}
              toMonth={new Date()}
              disabledDays={{ after: new Date() }}
              onDayMouseEnter={this.handleDayMouseEnter}
            />
          </div>
        )}
      </div>
    );
  }
}

SelectDatePicker.propTypes = {
  onChange: PropTypes.func
};

export default SelectDatePicker;
