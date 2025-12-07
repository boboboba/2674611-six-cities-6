import {Link} from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '20px'
    }}
    >
      <h1 style={{fontSize: '4rem', marginBottom: '1rem'}}>404</h1>
      <h2 style={{marginBottom: '2rem'}}>Page Not Found</h2>
      <Link
        to="/"
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          fontWeight: 'bold',
          transition: 'background-color 0.3s'
        }}
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
