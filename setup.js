import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import * as Components from './src';
import ComponentHtmlMarkup from './src/docs/ComponentHtmlMarkup';

// components
global.Button = Components.Button;
global.Tab = Components.Tab;
global.TabsWrapper = Components.TabsWrapper;
global.TabsList = Components.TabsList;
global.Tooltip = Components.Tooltip;
global.TooltipContent = Components.TooltipContent;

global.Toast = Components.Toast;
global.ToastWrapper = Components.ToastWrapper;

global.NotificationProvider = Components.NotificationProvider;
global.ToastConsumer = Components.ToastConsumer;
global.NotificationContext = Components.NotificationContext;
global.notificationConnect = Components.notificationConnect;

global.ModalBase = Components.ModalBase;
global.ModalPortal = Components.ModalPortal;
global.Modal = Components.Modal;
global.ActionModal = Components.ActionModal;
global.ModalHeader = Components.ModalHeader;
global.ModalFooter = Components.ModalFooter;
global.ModalBody = Components.ModalBody;

global.InputField = Components.InputField;
global.RadioButton = Components.RadioButton;
global.Form = Components.Form;
global.FormGroup = Components.FormGroup;
global.FieldGroup = Components.FieldGroup;
global.TextAreaField = Components.TextAreaField;
global.CheckboxField = Components.CheckboxField;
global.SelectField = Components.SelectField;
global.Select = Components.Select;
global.MultiSelectField = Components.MultiSelectField;
global.MultiSelect = Components.MultiSelect;
global.NumericInput = Components.NumericInput;
global.NumericInputField = Components.NumericInputField;
global.DatePicker = Components.DatePicker;
global.DatePickerInput = Components.DatePickerInput;
global.SelectDatePicker = Components.SelectDatePicker;
global.ReactDayPickerDateUtils = Components.ReactDayPickerDateUtils;

// docs components
global.ComponentHtmlMarkup = ComponentHtmlMarkup;
global.AlertCircleIcon = AlertCircleIcon;
