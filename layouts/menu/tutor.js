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
            name: 'Eventos',
            url: '/tutor/eventos/eventos-cadastrados',
            icon: 'icon-event'
        },
        {
            name: 'Notícias',
            url: '/tutor/noticias',
            icon: 'icon-envelope-open'
        },
        {
            name: 'Tutorias',
            icon: 'icon-notebook',
            children: [
                {
                    name: 'Quadro de tutorias',
                    url: '/tutor/tutorias/quadro-de-tutorias',
                    icon: 'icon-graduation'
                },
                {
                    name: 'Tutorias ministradas',
                    url: '/tutor/tutorias/tutorias-ministradas',
                    icon: 'icon-check'
                }
            ]
        },
        {
            name: 'Pessoas cadastradas',
            url: '/tutor/pessoas-cadastradas',
            icon: 'icon-people'
        }
    ]
}