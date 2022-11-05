import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useContext, useEffect, useState } from 'react';
import Button from "../components/Button";
import GlobalContext from "../context/GlobalContext";
import { IconButton } from "react-native-paper";


export default function Student({navigation}) {
    const { axiosInstance, user } = useContext(GlobalContext);
    const [date, setDate] = useState((new Date()).toISOString().split('T')[0])
    const [show, setShow] = useState(false)
    const [data, setData] = useState(null);
    const [day, setDay] = useState(0);
    const getDays = async () => {
        let rollNo = user.email.split('@')[0];
        try {
            const res = await axiosInstance.post('/api/days', { rollNo: rollNo });
            setDay(() => res.data.data);
        } catch (error) {
            console.log(error);
            alert(error.response.data.msg);
        }
    }
    const showDate = async () => {
        let rollNo = user.email.split('@')[0];
        setData(() => null);
        setShow(() => false);
        try {
            const res = await axiosInstance.post('/api/get/', { rollNo: rollNo, date: date })
            console.log(res.data);
            setData(() => res.data.data);
            setShow(() => true);

        } catch (error) {
            console.log(error.response.data.msg);
            alert(error.response.data.msg);
        }
    }
    useEffect(() => {
        getDays();
    }, [])
    return (
        <View style={styles.container}>
            <View>
                <IconButton icon="account-circle-outline" size={30} style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    margin: 10
                }}
                onPress={()=> navigation.navigate('Profile')}
                 />
            </View>
            <View style={styles.upInfo}>
                <Text>
                    <Text style={styles.text_sub_heading}>No of active days : </Text>
                    <Text style={styles.text_status}>{day}</Text>
                </Text>
                <Text>
                    <Text style={styles.text_sub_heading}>Total Charges till now : </Text>
                    <Text style={styles.text_status}>{day * 180}</Text>
                </Text>
            </View>


            <Calendar
                initialDate={date}
                onDayPress={(day) => {
                    setDate(() => day.dateString)
                }}
                style={{
                    width: Dimensions.get('window').width - 50,
                }}
            />


            <View >
                <Button mode="contained" onPress={showDate}>Check Attendance</Button>
                <View style={styles.resultArea}>
                    {show && (
                        <View>
                            <View style={styles.text}>
                                <Text style={styles.text_heading}>BreakFast</Text>
                                <View style={styles.text_status}>
                                    <Image source={data.B ? require('../assets/tick.gif') : require('../assets/cross.gif')} style={styles.text_image} />
                                </View>
                            </View>
                            <View style={styles.text}>
                                <Text style={styles.text_heading}>Lunch</Text>
                                <View style={styles.text_status}>
                                    <Image source={data.L ? require('../assets/tick.gif') : require('../assets/cross.gif')} style={styles.text_image} />
                                </View>
                            </View>
                            <View style={styles.text}>
                                <Text style={styles.text_heading}>Snacks</Text>
                                <View style={styles.text_status}>
                                    <Image source={data.S ? require('../assets/tick.gif') : require('../assets/cross.gif')} style={styles.text_image} />
                                </View>
                            </View>
                            <View style={styles.text}>
                                <Text style={styles.text_heading}>Dinner</Text>
                                <View style={styles.text_status}>
                                    <Image source={data.D ? require('../assets/tick.gif') : require('../assets/cross.gif')} style={styles.text_image} />
                                </View>
                            </View>
                        </View>
                    )}
                </View>

            </View>
        </View>
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
        width: '60%',
        fontSize: 20,
        fontWeight: '700',
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
