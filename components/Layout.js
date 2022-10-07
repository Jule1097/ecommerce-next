

export const Layout = ({ children }) => {
  return (
    <div className="layout">
         <div className="p-6 mx-auto">{children}</div>
    </div>
  );
};
 
export default Layout;