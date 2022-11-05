import { getData, storeData } from "./src/asyncStorage/storageFunctions"
import uuid from 'react-native-uuid';

const onLoad = async (setUser, setAccessToken, setRefreshToken, setAuth, navigation, axiosInstance, setMachineId) => {
    let accessToken = await getData("accessToken");
    let refreshToken = await getData("refreshToken");
    let machineId = await getData("machineId");
    if (machineId === null) {
        machineId = uuid.v4();
        storeData("machineId", machineId);
    }
    console.log(machineId);
    setMachineId(() => machineId);
    console.log(machineId);
    if (accessToken !== null && refreshToken !== null) {
        try {
            const res = await axiosInstance.get("/api/session/auto-login", { headers: { 'x-access-token': accessToken, 'x-refresh-token': refreshToken, 'machine-id': machineId } });
            console.log(res.data);
            setAuth(() => true);
            setUser(() => res.data.userData);
            setAccessToken(() => res.data.accessToken);
            setRefreshToken(() => res.data.refreshToken);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            })
        } catch (error) {
            console.log(error);
        }
    }


}

export default onLoad;

