/**
 * src/state/index.jsx
 */


import { DBContext, DBProvider } from "./DBContext";


const Provider = ({ children }) => {
  return (
    <DBProvider>
      {children}
    </DBProvider>
  )
}


export {
  Provider,
  DBContext
}