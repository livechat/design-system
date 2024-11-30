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
    'James Lewis',
    'Olivia Walker',
    'Daniel Hall',
    'Isabella Scott',
  ];

  const getRandomElement = <T,>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  return Array.from({ length }, (_, index) => ({
    id: index + 1,
    name: getRandomElement(names),
    age: Math.floor(Math.random() * 43) + 18,
    role: getRandomElement(roles),
    action: <Button size="xcompact">Edit</Button>,
  }));
};
