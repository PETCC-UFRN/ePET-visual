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
            name: 'Quadro de tutorias',
            url: '/usuario/quadro-de-tutorias',
            icon: 'icon-docs'
        },
        {
            name: 'Notícias',
            url: '/usuario/noticia',
            icon: 'icon-envelope-open'
        },
    ]
}