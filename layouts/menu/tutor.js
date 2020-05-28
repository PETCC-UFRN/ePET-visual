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
            url: '/tutor', 
            icon: 'icon-home'
        },
        {
            name: 'Notícias',
            url: '/tutor/noticias',
            icon: 'icon-envelope-letter'
        },
        {
            name: 'Eventos',
            icon: 'icon-event',
            children: [
                {
                    name: 'Eventos abertos',
                    url: '/tutor/eventos-abertos',
                    icon: 'icon-calendar'
                },
                {
                    name: 'Eventos inscritos',
                    url: '/tutor/eventos-inscritos',
                    icon: 'icon-user-following'
                },
                {
                    name: 'Eventos organizados',
                    url: '/tutor/eventos-organizados',
                    icon: 'icon-user-following'
                }
            ]
        },
        {
            name: 'Tutorias',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Tutorias abertas',
                    url: '/tutor/tutorias-abertas',
                    icon: 'icon-book-open'
                },
                {
                    name: 'Tutorias solicitadas',
                    url: '/tutor/tutorias-solicitadas',
                    icon: 'icon-check'
                },
                {
                    name: 'Tutorias ministradas',
                    url: '/tutor/tutorias-ministradas',
                    icon: 'icon-check'
                }
            ]
        },
        {
            name: 'Pessoas cadastradas',
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