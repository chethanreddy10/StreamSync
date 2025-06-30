import {axiosInstance} from "../lib/axios.js";

export async function signup(userData) {
  try {
    const response = await axiosInstance.post("/auth/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // THROW the error to let React Query handle it
    return null; // or you can throw the error directly
    // throw error; // Uncomment this line if you want to throw the error
  }
}

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};


export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser=async()=>{
       try{
        const res=await axiosInstance.get('/auth/me');//at the backend authenticating.
       return res.data;
       }
       catch(error){
        console.log("error in getting auth user data",error);
        return null;
       }
       //note initially faced problem here .
       //if hte data is not authenticated then it will return null. but initially we are not using try catch block.
        //so we need to handle that in the component where we are using this hook.
     }

     
export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};



export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}



 