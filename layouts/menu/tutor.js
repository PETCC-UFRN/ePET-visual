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
            url: '/tutor#', 
            icon: 'icon-home'
        },
        {
            name: 'Notícias',
            url: '/tutor/noticias',
            icon: 'icon-envelope-letter'
        },
        {
            name: 'Tutorias',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Abertas',
                    url: '/tutor/tutorias-abertas',
                    icon: 'icon-book-open'
                },
                {
                    name: 'Solicitadas',
                    url: '/tutor/tutorias-solicitadas',
                    icon: 'icon-check'
                },
                {
                    name: 'Ministradas',
                    url: '/tutor/tutorias-ministradas',
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
                    url: '/tutor/eventos-abertos',
                    icon: 'icon-calendar'
                },
                {
                    name: 'Inscritos',
                    url: '/tutor/eventos-inscritos',
                    icon: 'icon-user-following'
                },
                {
                    name: 'Organizados',
                    url: '/tutor/eventos-organizados',
                    icon: 'icon-user-following'
                }
            ]
        },
        {
            name: 'Pessoas',
            url: '/tutor/pessoas-cadastradas',
            icon: 'icon-people'
        },
        {
            name: 'Configurações',
            url: '/tutor/configuracoes',
            icon: 'icon-settings'
        },
    ]
}