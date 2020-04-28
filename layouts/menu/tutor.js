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
            name: 'Perfil',
            url: '/tutor/perfil',
            icon: 'icon-user'
        },

        {
            name: 'Eventos',
            url: '/tutor/eventos/eventos-cadastrados',
            icon: 'icon-event'
        },
        {
            name: 'Notícias',
            url: '/tutor/noticia',
            icon: 'icon-envelope-open'
        },
        {
            name: 'Tutorias',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Quadro de tutoria',
                    url: '/tutor/tutorias/quadro-de-tutoria',
                    icon: 'icon-docs'
                },
                {
                    name: 'Tutorias ministradas',
                    url: '/tutor/tutorias/tutorias-ministradas',
                    icon: 'icon-check'
                }
            ]
        },
        {
            name: 'Disciplinas',
            url: '/tutor/disciplinas',
            icon: 'icon-book-open'
        },
        {
            name: 'Pessoas cadastradas',
            url: '/tutor/pessoas-cadastradas',
            icon: 'icon-people'
        }
    ]
}