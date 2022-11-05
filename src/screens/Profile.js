
import { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button'
import GlobalContext from '../context/GlobalContext';
import BackButton from '../components/BackButton'
function Profile({ navigation }) {
  const { axiosInstance, accessToken, refreshToken, machineId } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const fetechProfile = async () => {

    try {

      const res = await axiosInstance.get('/api/user/profile', { headers: { 'x-access-token': accessToken, 'x-refresh-token': refreshToken, 'machine-id': machineId } });
      setData(() => res.data.userData);
      console.log(res);
    } catch (error) {
      alert(error.toString())
      console.log(error);
    }
  }

  const logoutUser = async () => {
    try {

      const res = await axiosInstance.get('/api/session/logout', { headers: { 'x-access-token': accessToken, 'x-refresh-token': refreshToken, 'machine-id': machineId } });
      console.log(res.data);
      navigation.navigate('StartScreen');
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetechProfile();
  }, [])
  return (


    <Background style={{
      position: 'relative',
    }}>
      <BackButton goBack={navigation.goBack} />
      <Button onPress={logoutUser} icon='logout' style={{
        position: 'absolute',
        top: 47,
        right: -95,
      }}>Logout</Button>
      {data && <View style={{
        width: Dimensions.get('window').width - 50,
      }}>
        <Text style={{ color: "black", fontSize: 32, marginBottom: 12 }}>Your Profile </Text>
        <View style={styles.text}>
          <Text style={styles.text_heading}>Name</Text>
          <View style={styles.text_status}>
            <Text>{data.name}</Text>
          </View>
        </View>
        <View style={styles.text}>
          <Text style={styles.text_heading}>Email</Text>
          <View style={styles.text_status}>
            <Text>{data.email}</Text>
          </View>
        </View>
        <View style={styles.text}>
          <Text style={styles.text_heading}>Phone No.</Text>
          <View style={styles.text_status}>
            <Text>{data.phone}</Text>
          </View>
        </View>
        <View style={styles.text}>
          <Text style={styles.text_heading}>Mess Name</Text>
          <View style={styles.text_status}>
            <Text>{data.messName}</Text>
          </View>
        </View>
      </View>
      }
      <View style={{
        width: Dimensions.get('window').width - 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40
      }}>
        <Button onPress={() => navigation.replace('ChangePassword')} style={{
          width: 'auto',
        }}>Password Change</Button>
        <Button mode="contained" onPress={() => navigation.replace('RecentDevice')} style={{
          width: 'auto',
        }}>Recent Device</Button>
      </View>
    </Background>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    height: 'auto',
    width: Dimensions.get('window').width - 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12.5,
    marginBottom: 12.5,
  },
  text_heading: {
    width: '45%',
    fontSize: 22.5,
    fontWeight: '700',
    color: 'black',
  },
  text_sub_heading: {
    width: '60%',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  text_status: {
    width: '40%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
})

export default Profile