export interface MenuInterface {
    title: string;
    url: string;
    icon: string;
    requireLogin: boolean;
}

export const menu: MenuInterface[] = [
    {
        title: 'Inicio',
        url: '/folder/Inbox',
        icon: 'mail',
        requireLogin: false
    },
    {
        title: 'Resumen',
        url: '/folder/Dashboard',
        icon: 'paper-plane',
        requireLogin: true
    },
    {
        title: 'Comunidades',
        url: '/folder/Communities',
        icon: 'heart',
        requireLogin: false
    },
    {
        title: 'Piezas',
        url: '/folder/Pieces',
        icon: 'archive',
        requireLogin: false
    },
    {
        title: 'More',
        url: '/folder/More',
        icon: 'trash',
        requireLogin: false
    },
    {
        title: 'And More ;)',
        url: '/folder/Much_More',
        icon: 'warning',
        requireLogin: false
    }
];