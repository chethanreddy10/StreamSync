import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

//it is mandatory to use use at start of custom hook.
  //we are using this multiple times. so this is kept seperrately.
//   const {data:authData,isLoading,error}=useQuery({
//      queryKey: ["authUser"],
//      queryFn: getAuthUser,
//      retry:false,//best as for auth check only once is needed
//   });


//instead of destructuring.
//my mistake was using async in hooks.
// This causes the value of authUser to always be undefined
const useAuthUser=()=>{
  const authUser=useQuery({
     queryKey: ["authUser"],
     queryFn: getAuthUser,
     retry:false,
  });

  return {isLoading: authUser.isLoading,authUser:authUser.data?.user};
  //why .user?
  //  because
  //in the auth-route in backend we send response as json{ success:true,user:req.user}//obj containing the user as key see
}
export default useAuthUser;

//now you can use this hook in any component to get the auth user data.
//it will return isLoading,authUser,error
//isLoading is true when the data is being fetched.
//authUser will contain the user data if the user is authenticated.
//error will contain the error if there is any error while fetching the data.
//this is a custom hook to get the auth user data.
//it uses react-query to fetch the data and handle the loading and error states.
//this is a reusable hook to get the auth user data.
//to use this call this hook in any component and destructure the values.
//it will return isLoading,authUser,error