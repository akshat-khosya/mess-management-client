import React, { useContext } from 'react'
import Background from '../components/Background'
import GlobalContext from '../context/GlobalContext'
import Student from './Student'
import GateGuard from './GateGuard'
import Admin from './Admin'

export default function Dashboard({ navigation }) {
  const { auth, user } = useContext(GlobalContext);

  return (
    <Background>
      {
        user.role === 2 && <Student navigation={navigation} />
      }
      {
        user.role === 1 && <GateGuard />
      }
      {
        user.role === 0 && <Admin />
      } 
    </Background>
  )
}



