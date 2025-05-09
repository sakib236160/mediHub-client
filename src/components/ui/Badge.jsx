const Badge = ({ children, className }) => {
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded ${className}`}>
        {children}
      </span>
    );
  };
  
  export { Badge };