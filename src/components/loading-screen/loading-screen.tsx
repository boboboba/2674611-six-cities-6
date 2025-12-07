function LoadingScreen(): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
    }}
    >
      <span style={{
        width: '48px',
        height: '48px',
        border: '5px solid #000',
        borderBottomColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-block',
        boxSizing: 'border-box',
        animation: 'rotation 1s linear infinite'
      }}
      >

      </span>
      <style>
        {`@keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`}
      </style>
    </div>
  );
}

export default LoadingScreen;
