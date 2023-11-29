const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      action: 'read',
      subject: 'home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      action: 'read',
      subject: 'dashboard',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline'
    },
    {
      path: '/request',
      action: 'read',
      subject: 'request-page',
      title: 'Request Credentials',
      icon: 'mdi:format-list-checks'
    }
  ]
}

export default navigation
