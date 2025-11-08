import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {isAuthorized, children} = props;

  return (
    isAuthorized
      ? children
      : <Navigate to="/login"/>
  );
}

export default PrivateRoute;
