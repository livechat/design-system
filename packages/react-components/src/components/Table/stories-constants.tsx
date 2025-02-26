import { Button } from '../Button';

import { TableColumn, DataForPinningExample } from './types';

export const columnsForPinningExample: TableColumn<DataForPinningExample>[] = [
  { key: 'userId', header: 'ID' },
  { key: 'fullName', header: 'Name' },
  { key: 'years', header: 'Age' },
  { key: 'jobTitle', header: 'Title' },
  { key: 'team', header: 'Team' },
  { key: 'office', header: 'Office' },
  { key: 'availability', header: 'Status' },
  { key: 'workExperience', header: 'Experience' },
  { key: 'income', header: 'Salary' },
  { key: 'controls', header: 'Actions' },
];

export const dataForPinningExample: DataForPinningExample[] = [
  {
    userId: 1,
    fullName: 'Alice Brown',
    years: 29,
    jobTitle: 'Software Engineer',
    team: 'Development',
    office: 'Seattle',
    availability: 'Available',
    workExperience: '4 years',
    income: '$75,000',
    controls: <Button size="xcompact">Edit</Button>,
  },
  {
    userId: 2,
    fullName: 'Bob Green',
    years: 35,
    jobTitle: 'Product Manager',
    team: 'Product',
    office: 'Austin',
    availability: 'Busy',
    workExperience: '7 years',
    income: '$110,000',
    controls: <Button size="xcompact">Edit</Button>,
  },
  {
    userId: 3,
    fullName: 'Charlie Davis',
    years: 41,
    jobTitle: 'UX Designer',
    team: 'Design',
    office: 'Denver',
    availability: 'Available',
    workExperience: '10 years',
    income: '$95,000',
    controls: <Button size="xcompact">Edit</Button>,
  },
  {
    userId: 4,
    fullName: 'Dana White',
    years: 26,
    jobTitle: 'Data Analyst',
    team: 'Analytics',
    office: 'New York',
    availability: 'On Leave',
    workExperience: '2 years',
    income: '$65,000',
    controls: <Button size="xcompact">Edit</Button>,
  },
];
