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
            name: 'Tutorias',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Quadro de tutoria',
                    url: '/petiano/tutorias/quadro-de-tutoria',
                    icon: 'icon-docs'
                },
                {
                    name: 'Tutorias ministradas',
                    url: '/petiano/tutorias/tutorias-ministradas',
                    icon: 'icon-check'
                }
            ]
        },
        {
            name: 'Disciplinas',
            url: '/petiano/disciplinas',
            icon: 'icon-book-open'
        },
        {
            name: 'Pessoas cadastradas',
            url: '/petiano/pessoas-cadastradas',
            icon: 'icon-people'
        }
    ]
}