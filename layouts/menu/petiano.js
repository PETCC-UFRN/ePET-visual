export default {
    items: [{
            name: 'Dashboard',
            url: '#',
        },
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
            url: '/petiano', // TODO::Modificar depois para a página inicial do petiano
            icon: 'icon-home'
        },
        {
            name: 'Eventos',
            url: '/petiano/eventos',
            icon: 'icon-event'
        },
        {
            name: 'RH',
            url: 'rh',
            icon: 'icon-people',
            children: [{
                    name: 'Organizadores',
                    url: '/petiano/rh/organizadores',
                    icon: 'icon-user'
                },
                {
                    name: 'Participantes',
                    url: '/petiano/rh/participantes',
                    icon: 'icon-user-female',
                },
                {
                    name: 'Pessoas',
                    url: '/petiano/rh/pessoa',
                    icon: 'icon-user'
                },
                {
                    name: 'Usuários',
                    url: '/petiano/rh/usuarios',
                    icon: 'icon-user-female'
                },
            ]
        },
        {
            name: 'Notícias',
            url: '/petiano/noticia',
            icon: 'icon-envelope-open'
        },
        {
            name: 'Tutoria',
            url: '/petiano/tutoria',
            icon: 'icon-notebook'
        },
        {
            name: 'Disciplinas',
            url: '/petiano/disciplina',
            icon: 'icon-book-open'
        },
    ]
}