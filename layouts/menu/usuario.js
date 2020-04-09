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
            name: 'Notícias',
            url: '/usuario/noticia',
            icon: 'icon-envelope-open'
        },
    ]
}