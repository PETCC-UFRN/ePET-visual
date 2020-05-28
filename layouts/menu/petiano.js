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
            url: '/petiano',
            icon: 'icon-home'
        },
        {
            name: 'Notícias',
            url: '/petiano/noticias',
            icon: 'icon-envelope-open'
        },
        {
            name: 'Eventos',
            icon: 'icon-event',
            children: [
                {
                    name: 'Eventos Abertos',
                    url: '/petiano/eventos-abertos',
                    icon: 'icon-event'
                },
                {
                    name: 'Eventos Inscritos',
                    url: '/petiano/eventos-inscritos',
                    icon: 'icon-user-female',
                },
                {
                    name: 'Eventos Organizados',
                    url: '/petiano/eventos-organizados',
                    icon: 'icon-user'
                }
            ]
        },
        {
            name: 'Tutorias',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Tutorias Abertas',
                    url: '/petiano/tutorias-abertas',
                    icon: 'icon-book-open'
                },
                {
                    name: 'Tutorias Solicitadas',
                    url: '/petiano/tutorias-solicitadas',
                    icon: 'icon-check'
                },
                {
                    name: 'Tutorias Ministradas',
                    url: '/petiano/tutorias-ministradas',
                    icon: 'icon-check'
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