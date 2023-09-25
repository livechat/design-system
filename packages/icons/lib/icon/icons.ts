/// <reference types="vite-plugin-svgr/client" />
import { lazy } from 'react';

export const Tabler = {
  AccountCircle: lazy(
    async () => import('../assets/tabler/account_circle.svg?react')
  ),
  Activities: lazy(async () => import('../assets/tabler/activities.svg?react')),
};

export const Material = {
  AccountCircle: lazy(
    async () => import('../assets/material/account_circle.svg?react')
  ),
  Add: lazy(async () => import('../assets/material/add.svg?react')),
};

export const icons = {
  tabler: Tabler,
  material: Material,
};
