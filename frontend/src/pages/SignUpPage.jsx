
import { useState } from "react";
import {FerrisWheel} from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp.js";

const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword,setshowPassword]=useState(false);

// // This is how we did it at first, without using our custom hook
 // const queryClient=useQueryClient();
// //we call mutate as signupMutatation.
// const {mutate:signupMutation,isPending,error}=useMutation({
//   mutationFn:signup,
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     // navigate("/"); // redirect on success
//     //this is not needed. the authUser is refetched and updated.
//     //In App.jsx, the user is now authenticated (isAuthenticated = true), so the route returns <Navigate to="/" />.
//     // However, if we again call already manually called navigate("/") in SignUpPage.

//     //Double navigation — React Router doesn’t know which one to pick and keeps looping between rerenders and re-navigation.
//   },
 
// })

//mutationFn is defined but not called.


  // // This is how we did it using our custom hook - optimized version
const{signupMutation,isPending,error}=useSignUp();

const handleSignup=(e)=>{
  e.preventDefault();//so thaat screen is not refreshed.
  //when signup is clicked
    // Check native HTML form validation
  console.log("Error object:", error);

  signupMutation(signupData);//in hte const.for calling mutationFn mutate is actually  signup function.
}


  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">




        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <FerrisWheel className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              StreamSync
            </span>
          </div>


          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}


          <div className="w-full">
            <form onSubmit={handleSignup}>
            
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Monkey.D.Luffy"
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="abc@gmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Password</span>
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            className="input input-bordered w-full"
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            required
                          />
                          <label className="label cursor-pointer mt-2">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-sm mr-2"
                              checked={showPassword}
                              onChange={(e) => setshowPassword(e.target.checked)}
                            />
                            <span className="label-text text-sm">Show password</span>
                          </label>
                          <p className="text-xs opacity-70 mt-1">
                            Password must be at least 6 characters long
                          </p>
                  </div>


                  {/* <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div> */}
                </div>

                <button className="btn btn-primary w-full" type="submit" disabled={isPending}>

                  {isPending? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
       <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
