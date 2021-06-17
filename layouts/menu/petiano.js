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
                    name: 'Abertas',
                    url: '/petiano/tutorias-abertas',
                    icon: 'icon-book-open'
                },
                {
                    name: 'Solicitadas',
                    url: '/petiano/tutorias-solicitadas',
                    icon: 'icon-check'
                },
                {
                    name: 'Ministradas',
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
                    name: 'Abertos',
                    url: '/petiano/eventos-abertos',
                    icon: 'icon-calendar'
                },
                {
                    name: 'Inscritos',
                    url: '/petiano/eventos-inscritos',
                    icon: 'icon-user-following'
                },
                {
                    name: 'Organizados',
                    url: '/petiano/eventos-organizados',
                    icon: 'icon-user-following'
                }
            ]
        },
        {
            name: 'Outras atividades',
            url: '/petiano/outras-atividades',
            icon: 'icon-badge'
        },
        {
            name: 'Pessoas',
            url: '/petiano/pessoas-cadastradas',
            icon: 'icon-people'
        },
        {
            name: 'Configurações',
            url: '/petiano/configuracoes',
            icon: 'icon-settings'
        },

    ]
}