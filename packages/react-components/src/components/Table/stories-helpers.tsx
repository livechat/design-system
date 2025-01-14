import { Button } from '../Button';

import { Data } from './types';

export const generateData = (length: number): Data[] => {
  const roles = [
    'Developer',
    'Designer',
    'Manager',
    'Intern',
    'QA Engineer',
    'Product Owner',
    'Scrum Master',
    'Data Analyst',
    'Marketing Specialist',
    'HR Coordinator',
    'Technical Writer',
    'Sales Representative',
  ];

  const names = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Mike Williams',
    'Chris Brown',
    'Patricia Garcia',
    'Robert Davis',
    'Linda Martinez',
    'Michael Clark',
    'Emily Adams',
    'David Harris',
    'Sophia Thomas',
  ];

  const age = [24, 43, 47, 18, 56, 5, 67, 78, 66, 65, 77, 78];

  return Array.from({ length }, (_, index) => ({
    id: index + 1,
    name: names[index],
    age: age[index],
    role: roles[index],
    action: <Button size="xcompact">Edit</Button>,
  }));
};
