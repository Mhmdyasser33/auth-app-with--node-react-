import { useEffect, useState } from "react";
import apiRequest from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Users.module.css"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const serverPath = "http://localhost:5000";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate("") ;  

  const handleLogout = async()=>{
    try{
        if(accessToken){
          Cookies.remove("accessToken") ; 
        }
        const res = await apiRequest({
          url : `${serverPath}/auth/logout`,
          method : "POST" , 
        })
        const responseMessage = res.message ; 
        toast.success(responseMessage , {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/auth/login")
        }, 1000);
       
    } catch(err){
        console.log(`error in deleting cookies ${err}`)
    }
     
  } 

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const res = await apiRequest({
          url: `${serverPath}/users`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(res);
      } catch (err) {
        setError(`Error in fetching users: ${err}`);
      }
    };
    fetchUsers();
  }, [accessToken]);

  return (
    <>
    <div>
      <h2 className ={styles.h2}>Users Info</h2>
      {error && <p className={styles.p}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>First Name</th>
            <th className={styles.th}>Last Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Created At</th>
            <th className={styles.th}>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <p  className={styles.p}> No users found </p>
          ) : users.map((user) => (
            <tr key={user._id}>
              <td className={styles.td}>
                {user.first_name}
              </td>
              <td className={styles.td}>
                {user.last_name}
              </td>
              <td className={styles.td}>
                {user.email}
              </td>
              <td className={styles.td}>
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td>
                {new Date(user.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}  
        </tbody>
      </table>
    </div>
     <div style={{marginTop : "20px"}}>
     <button onClick={handleLogout}> logout </button>
   </div>
   <ToastContainer/>
   </>
  );
};

export default Users;
