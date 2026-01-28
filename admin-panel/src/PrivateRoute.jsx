// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const PrivateRoute = ({ children }) => {
//   const { user } = useSelector((state) => state.auth);
//   console.log("PrivateRoute user:", user); // add this log

//   if (!user) {
//     console.log("No user, redirecting to /");
//     return <Navigate to="/" replace />; // added return here
//   }

//   console.log("User found, rendering children");
//   return children;
// };

// export default PrivateRoute;
