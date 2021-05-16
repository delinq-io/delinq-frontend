const guestMiddleware = ({ $auth, redirect }) => {
  if ($auth.loggedIn) {
    redirect('/workspaces')
  }
}

export default guestMiddleware
