import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGoogleSignInMutation } from '../../redux/Auth/authApi'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase'
import { setUser } from '../../redux/Auth/authSlice'
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()

    const [googleSignIn, { data: googleData, isError, isSuccess, isLoading, error }] = useGoogleSignInMutation()

    const loginHandler = async(e) => {
        e.preventDefault()

        try {
            
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

            let formData = {
                username: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            }

            googleSignIn(formData)

        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    useEffect(()=> {

        if(isSuccess){
            dispatch(setUser(googleData))
            navigate('/')
    
            toast({
                title: "Login Successful",
                description: `You have successfully logged in as ${googleData.username}`,
                status: "success",
                duration: 3000,
                isClosable: true,
              })
    
              if(isError){
                toast({
                    title: "Error",
                    description: {error},
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
        } 
        
        }, [isSuccess, isError])

  return (
    <div className="">
        
        <button className="bg-gray-200 hover:bg-gray-300 transition duration-300 p-2 flex items-center rounded-md" onClick={loginHandler}><FcGoogle className="mr-2 text-2xl" />
        Sign in with Google</button>
    </div>
  )
}

export default OAuth