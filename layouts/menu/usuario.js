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
            url: '/usuario', // TODO::Modificar depois para a página inicial do petiano
            icon: 'icon-home'
        },
        {
            name: 'Perfil',
            url: '/usuario/perfil',
            icon: 'icon-user'
        },

        {
            name: 'Eventos',
            icon: 'icon-event',
            children: [
                {
                    name: 'Todos os eventos',
                    url: '/usuario/eventos/eventos-cadastrados',
                    icon: 'icon-book-open'
                },{
                    name: 'Meus eventos',
                    url: '/#',
                    icon: 'icon-check'
                }
            ]
        },

        {
            name: 'Tutoria',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Quadro de tutoria',
                    url: '/usuario/tutoria/quadro-de-tutoria',
                    icon: 'icon-docs'
                },
                {
                    name: 'Agendar tutoria',
                    url: '/#',
                    icon: 'icon-calendar'
                }
            ]
        },

        {
            name: 'Notícias',
            url: '/usuario/noticia',
            icon: 'icon-envelope-open'
        },
    ]
}