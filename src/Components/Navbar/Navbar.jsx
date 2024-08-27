import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlexRow } from '../UI'
import { logout } from '../../redux/Auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, useDisclosure } from '@chakra-ui/react'
import CreateLoad from '../Modals/CreateLoad'

const Navbar = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log(user)

    const logoutHandler = () => {

        dispatch(logout())
        navigate('/auth')


    }

  return (
    <div className="bg-blue-950 h-16 flex items-center justify-between p-2">
        <Link to="/"><h1 className="text-white text-2xl">Tentlify</h1></Link>
        <div>
            {user ? <FlexRow>
                <button onClick={onOpen} className="text-white rounded-md border-2 border-white p-2 mr-2">Add Checklist</button>
                <button onClick={()=> navigate('/loads')} className="text-white rounded-md border-2 border-white p-2 mr-2">Loads</button>
                <div className="text-white flex items-center gap-1 rounded-md border-2 border-white p-2 mr-2"><Avatar size="xs" src={user?.image} />{user?.username}</div>
                <button onClick={logoutHandler} className="text-white rounded-md border-2 border-white p-2 mr-2">Logout</button>
                </FlexRow> : <button onClick={()=> navigate('/auth')} className="text-white rounded-md border-2 border-white p-2">Sign in</button>}
        </div>
        <CreateLoad isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default Navbar