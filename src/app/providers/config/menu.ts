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
        url: '/dashboard',
        icon: 'paper-plane',
        requireLogin: true
    },
    {
        title: 'Comunidades',
        url: '/community/list',
        icon: 'heart',
        requireLogin: false
    },
    // {
    //     title: 'Piezas',
    //     url: '/folder/Pieces',
    //     icon: 'archive',
    //     requireLogin: false
    // }
];