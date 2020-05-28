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
            url: '/tutor', // TODO::Modificar depois para a página inicial do tutor
            icon: 'icon-home'
        },
        {
            name: 'Notícias',
            url: '/tutor/noticias',
            icon: 'icon-envelope-open'
        },
        {
            name: 'Eventos',
            icon: 'icon-event',
            children: [
                {
                    name: 'Eventos abertos',
                    url: '/tutor/eventos-abertos',
                    icon: 'icon-event'
                },
                {
                    name: 'Eventos inscritos',
                    url: '/tutor/eventos-inscritos',
                    icon: 'icon-user-female',
                },
                {
                    name: 'Eventos organizados',
                    url: '/tutor/eventos-organizados',
                    icon: 'icon-user'
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