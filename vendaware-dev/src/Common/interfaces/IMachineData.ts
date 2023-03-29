export interface ILocation {
    lat: number;
    long: number;
}

export interface IMachineData {
    uid: string;            //  firestore id - in case we want to update records in firestore
    address: string;        //  machine location using local address
    id: string;             //  the machine id - could be MAC address
    installed: Date;        //  machine installed date
    location: ILocation;    //  machine location using Lat/Long coordinates
    sVersion: string;       //  software version
}

export interface IMachineDataMap {
    [id: string]: IMachineData;
}