export default {
    items: [{
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
            url: '/usuario',
            icon: 'icon-home'
        },
        {
            name: 'Notícias',
            url: '/usuario/noticias',
            icon: 'icon-envelope-letter'
        },
        {
            name: 'Tutorias',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Tutorias abertas',
                    url: '/usuario/tutorias-abertas',
                    icon: 'icon-book-open'
                },
                {
                    name: 'Minhas tutorias',
                    url: '/usuario/minhas-tutorias',
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
                    url: '/usuario/eventos-abertos',
                    icon: 'icon-calendar'
                },
                {
                    name: 'Inscritos',
                    url: '/usuario/eventos-inscritos',
                    icon: 'icon-user-following'
                },
                {
                    name: 'Organizados',
                    url: '/usuario/eventos-organizados',
                    icon: 'icon-user-following'
                }
            ]
        },
    ]
}