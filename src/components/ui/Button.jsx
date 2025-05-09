const Button = ({ children, className, ...props }) => {
    return (
      <button
        className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export { Button };
  