import React, { useContext, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import onLoad from '../../onLoad'
import GlobalContext from '../context/GlobalContext'

export default function StartScreen({ navigation }) {
  const { axiosInstance, setAuth, setUser, auth, setAccessToken, setRefreshToken, setMachineId } = useContext(GlobalContext);
  useEffect(() => {
    setTimeout(() => {
      onLoad(setUser, setAccessToken, setRefreshToken, setAuth, navigation, axiosInstance, setMachineId);
    }, 1000);
  }, [])
  return (
    <Background>
      <Logo />
      <Header>IIIT Una</Header>
      <Paragraph>
        MESSAM
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
