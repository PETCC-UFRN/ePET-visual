export default {
  items: [
    {
      name: 'Dashboard',
      url: '/',
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
      name: 'Inicio',
      url: '/admin', // TODO::Modificar depois para a página inicial do petiano
      icon: 'icon-home'
    },
    {
      name: 'Eventos',
      url: '/eventos',
      icon: 'icon-event'
    },
    {
      name: 'RH',
      url: '',
      icon: 'icon-people',
      children: [
        {
          name: 'Organizadores',
          url: '/organizadores',
          icon: 'icon-user'
        },
        {
          name: 'Participantes',
          url: '/participantes',
          icon: 'icon-user-female',
        },
        {
          name: 'Pessoas',
          url: '/pessoa',
          icon: 'icon-user'
        },
        {
          name: 'Usuarios',
          url: '/usuarios',
          icon: 'icon-user-female'
        },
      ]
    },
    {
      name: 'Perfil',
      url: '/perfil',
      icon: 'icon-event'
    },
    {
      name: 'Disciplinas',
      url: '/disciplina',
      icon: 'icon-event'
    },
    {
      name: 'Tutoria',
      url: '/tutoria',
      icon: 'icon-event'
    }
  ]
}
