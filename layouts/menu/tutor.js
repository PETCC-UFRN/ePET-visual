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
            url: '/petiano', // TODO::Modificar depois para a página inicial do petiano
            icon: 'icon-home'
        },
        {
            name: 'Eventos',
            icon: 'icon-event',
            children: [
                {
                    name: 'Eventos cadastrados',
                    url: '/petiano/eventos/eventos-cadastrados',
                    icon: 'icon-event'
                },{
                    name: 'Organizadores',
                    url: '/petiano/eventos/organizadores',
                    icon: 'icon-user'
                },
                {
                    name: 'Participantes',
                    url: '/petiano/eventos/participantes',
                    icon: 'icon-user-female',
                }
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
        {
            name: 'Dados cadastrais',
            url: '/petiano/dados-cadastrais',
            icon: 'icon-user'
        },
        {
            name: 'Perfis',
            url: '/petiano/perfis',
            icon: 'icon-user-female'
        }
    ]
}