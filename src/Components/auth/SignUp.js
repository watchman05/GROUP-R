import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase/firebase'
import toast from 'react-hot-toast';

const SignUp = () => {
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const successNotify = (message) => toast.success(message)
  const failureNotify = (message) => toast.error(message)

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("username", formData.username)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      if(userCredential && userCredential.user){
        localStorage.setItem("isLoggedIn", "false")
        successNotify("user account created successfully")

        setTimeout(()=> {
          navigate("/auth/login")
        }, 3000)
      }
    } catch (error) {
      setError(error.message);
      failureNotify(error.message)
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
              GroupR-Notes    
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Get Started
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                      <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fullname</label>
                        <input onChange={handleChange} type="text" value={formData.username} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Samuel Luther" required=""/>
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input onChange={handleChange} type="email" value={formData.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@company.com" required=""/>
                      </div>
                      <div>
                          <label htmlor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input onChange={handleChange} value={formData.password} type="password" name="password" id="password" placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600
                            focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <button 
                      onClick={handleSubmit}
                      type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
                       dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Have an account already? <Link to="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default SignUp