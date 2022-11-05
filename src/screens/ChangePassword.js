import React, { useContext, useState } from 'react'
import BackButton from '../components/BackButton'
import Background from '../components/Background'
import TextInput from '../components/TextInput'
import Header from '../components/Header'
import GlobalContext from '../context/GlobalContext'
import Button from '../components/Button'
function ChangePassword({navigation}) {
    const { axiosInstance,accessToken,refreshToken,machineId } = useContext(GlobalContext);
    
    const [cpassword,setPassword] = useState("");
    const [newpassword,setNewPassword] = useState("");
    const [repassword,setRePassword] = useState("");
    const onchangePassword  = async ()=>{
        if(cpassword.length<6){
            alert("Current Password is too short");
            return;
        }
        if(newpassword.length<6){
            alert("New Password is too short");
            return;
        }
        if(newpassword!==repassword){
            alert("New Password and Re-Password does not match");
            return;
        }
        try {
            const res = await axiosInstance.post('/api/user/change-password',{cpassword:cpassword,newpassword:newpassword},{headers: {'x-access-token': accessToken, 'x-refresh-token': refreshToken, 'machine-id': machineId}});
            alert("Password Changed");
            navigation.navigate('LoginScreen')
        } catch (error) {
            console.log(error);
            alert(error.toString());
        }

        
    }
  return (
    <Background>
        <BackButton goBack={navigation.goBack} />
        <Header>Change Password</Header>
        <TextInput
        value={cpassword}
        onChangeText={(text) => setPassword(text)}
        label="Current Password"
        returnKeyType="next"
      />
      <TextInput
        value={newpassword}
        onChangeText={(text) => setNewPassword(text)}
        label="New Password"
        returnKeyType="next"
      />
      <TextInput
        value={repassword}
        onChangeText={(text) => setRePassword(text)}
        label=" Confirm New Password"
        returnKeyType="next"
      />
      <Button mode="contained" onPress={onchangePassword}>
        Change Password
      </Button>
    </Background>
  )
}

export default ChangePassword