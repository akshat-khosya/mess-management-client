import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { Text, View,StyleSheet,Dimensions } from 'react-native';
import BackButton from '../components/BackButton'
import Background from '../components/Background'
import Header from '../components/Header'
import GlobalContext from '../context/GlobalContext';

function RecentDevices({ navigation }) {
  const { axiosInstance, accessToken, refreshToken, machineId } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const getDevices = async () => {
    try {
      const res = await axiosInstance.get("/api/session/devices", { headers: { 'x-access-token': accessToken, 'x-refresh-token': refreshToken, 'machine-id': machineId } });
      console.log(res.data);
      setData(() => res.data.results);
    } catch (e) {
      alert("Try Again");
      console.log(e)
    }
  }
  useEffect(() => {
    getDevices();
  }, [])
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Recent Devices Information</Header>
      {data && <View>
        {data.map((item, index) => {
          return <View style={{margin:10}} key={index}>
            <Text style={styles.text_sub_heading}>Device {index+1}</Text>
            <Text style={styles.text_heading}>User Agent: {item.userAgent}</Text>
            {item.valid ? <Text style={styles.text_heading}>Current Active Machine</Text> : <Text style={styles.text_heading}>Valid: No</Text>}
            <Text style={styles.text_heading}>Last Used on this Device : {moment(item.lastActive).format('[on] MMMM Do YYYY, h:mm:ss')}</Text>
            <Text style={styles.text_heading}>First Time Login on this Device : {moment(item.createdAt).format('[on] MMMM Do YYYY, h:mm:ss')}</Text>
            <Text style={styles.text_heading}>Ip addresss : {JSON.parse(item.location).ip}</Text>
            <Text style={styles.text_heading}>Country : {JSON.parse(item.location).country}</Text>
            <Text style={styles.text_heading}>State : {JSON.parse(item.location).region}</Text>
            <Text style={styles.text_heading}>Network Service Orginization : {JSON.parse(item.location).connection.org}</Text>
          </View>
        }
        )}
      </View>}
    </Background>
  )
}
const styles = StyleSheet.create({
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
      
      fontSize: 13,
      fontWeight: '500',
      color: 'black',
  },
  text_sub_heading: {
      width: '60%',
      fontSize: 18.5,
      fontWeight: '600',
      color: 'black',
  },
  text_status: {
      width: '40%',
      fontSize: 20,
      fontWeight: 'bold',
      color: 'green',
  },
  text_image: {
      height: 30,
      width: 30,
  },
  container: {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
      height: Dimensions.get('window').height - 50,
  },

  resultArea: {
      display: 'flex',
      marginTop: 10,
      justifyContent: "flex-start",
      alignItems: "center",
  },

  upInfo: {

  }
})
export default RecentDevices