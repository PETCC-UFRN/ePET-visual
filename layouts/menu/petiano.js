export default {
    items: [
        {
            title: true,
            name: 'Menu de navegação',
            class: '',
            wrapper: {
                element: '',
                attributes: {}
            }
        },
        {
            name: 'Início',
            url: '/petiano#',
            icon: 'icon-home'
        },
        {
            name: 'Notícias',
            url: '/petiano/noticias',
            icon: 'icon-envelope-letter'
        },
        {
            name: 'Tutorias',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Tutorias abertas',
                    url: '/petiano/tutorias-abertas',
                    icon: 'icon-book-open'
                },
                {
                    name: 'Tutorias solicitadas',
                    url: '/petiano/tutorias-solicitadas',
                    icon: 'icon-check'
                },
                {
                    name: 'Tutorias ministradas',
                    url: '/petiano/tutorias-ministradas',
                    icon: 'icon-check'
                }
            ]
        },
        {
            name: 'Eventos',
            icon: 'icon-event',
            children: [
                {
                    name: 'Eventos abertos',
                    url: '/petiano/eventos-abertos',
                    icon: 'icon-calendar'
                },
                {
                    name: 'Eventos inscritos',
                    url: '/petiano/eventos-inscritos',
                    icon: 'icon-user-following'
                },
                {
                    name: 'Eventos organizados',
                    url: '/petiano/eventos-organizados',
                    icon: 'icon-user-following'
                }
            ]
        },
        {
            name: 'Configurações',
            url: '/petiano/configuracoes',
            icon: 'icon-settings'
        },

    ]
}