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
            icon: 'icon-event',
            children: [
                {
                    name: 'Eventos cadastrados',
                    url: '/tutor/eventos/eventos-cadastrados',
                    icon: 'icon-event'
                },{
                    name: 'Organizadores',
                    url: '/tutor/eventos/organizadores',
                    icon: 'icon-user'
                },
                {
                    name: 'Participantes',
                    url: '/tutor/eventos/participantes',
                    icon: 'icon-user-female',
                }
            ]
        },
        {
            name: 'Notícias',
            url: '/tutor/noticia',
            icon: 'icon-envelope-open'
        },
        {
            name: 'Tutoria',
            url: '/tutor/tutoria',
            icon: 'icon-notebook'
        },
        {
            name: 'Disciplinas',
            url: '/tutor/disciplina',
            icon: 'icon-book-open'
        },
        {
            name: 'Participantes',
            url: '/tutor/participantes',
            icon: 'icon-user-female'
        }
    ]
}