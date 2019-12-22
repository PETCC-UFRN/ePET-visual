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
      url: 'rh',
      icon: 'icon-people',
      children: [
        {
          name: 'Organizadores',
          url: 'organizadores',
          icon: 'icon-user'
        },
        {
          name: 'Participantes',
          url: 'participantes',
          icon: 'icon-user-female',
        },
        {
          name: 'Pessoas',
          url: 'pessoa',
          icon: 'icon-user'
        },
        {
          name: 'Usuarios',
          url: 'usuarios',
          icon: 'icon-user-female'
        },
      ]
    },
    {
      name: 'Disciplinas',
      url: '/disciplina',
      icon: 'icon-book-open'
    },
    {
      name: 'Tutoria',
      url: '/tutoria',
      icon: 'icon-notebook'
    }
  ]
}
