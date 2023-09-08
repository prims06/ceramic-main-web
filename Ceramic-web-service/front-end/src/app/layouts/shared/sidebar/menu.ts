import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Accueil',
        icon: 'ri-dashboard-line',
        // badge: {
        //     variant: 'success',
        //     text: 'MENUITEMS.DASHBOARDS.BADGE',
        // },
        link: '/'
    },
            {
                id: 59,
                label: 'Scans',
                link: '/tables/advanced',
                icon: 'ri-table-2'
            },
            {
                id: 61,
                label: 'Rechercher',
                link: '/search',
                icon: 'ri-bar-chart-line',
            }
];
