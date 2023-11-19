/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = role => {
  if (role === 'client' && role === 'registrar') return '/home'
  else return '/home'
}

export default getHomeRoute
