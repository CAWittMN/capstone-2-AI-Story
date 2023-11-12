const ErrorOverlay = (errors) => {
  return (
    <div className="ErrorOverlay">
      <h1>Oops! Something went wrong.</h1>
      <ul>
        {errors.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorOverlay;
