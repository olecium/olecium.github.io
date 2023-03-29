import { getMachinesCollection } from 'Common/constants/FireStorePaths';
import { IMachineData, IMachineDataMap } from 'Common/interfaces/IMachineData';
import { isUndefinedOrEmpty } from 'Common/utils/typeGuards';
import { firestore } from 'Storage';

export const getMachineData = async (customer: string | undefined): Promise<IMachineDataMap> => {

    if (!isUndefinedOrEmpty(customer)) {
        const result: IMachineDataMap = {};
        const snapshot = await firestore.collection(getMachinesCollection(customer)).get();
        snapshot.forEach(function (doc) {
            const data = doc.data();
            //  Convert google firestore timestamp to Date
            data.installed = data.installed.toDate();
            //  Create record
            const machineData: IMachineData = {
                address: data.address,
                id: data.id,
                installed: data.installed,
                location: data.location,
                sVersion: data.sVersion,
                uid: doc.id,    //  Google firestore UID
            }
            //  add to map we can look up by machine id later
            result[data.id] = machineData;
        });

        return result;
    }

    throw new Error(`Undefined Customer UID`);
};
