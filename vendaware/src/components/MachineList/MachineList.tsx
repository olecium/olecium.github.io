import { useAuth } from './../Login/hooks/useAuth';
import React from 'react';
import { firestore } from 'Storage';
import firebase from 'firebase/app';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { makeStyles, Theme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: "#fff",
    }
}));

export interface IGridRow {
    id: number;
    col1: string;
    col2: string;
    col3: string;
}

const MachineList: React.FC = (): React.ReactElement => {

    const classes = useStyles();

    const { user } = useAuth();
    const { userInfo } = useAuth();
    const [rows, setRows] = React.useState<IGridRow[]>([]);

    React.useEffect(() => {
        const getMachines = async () => {
            if (userInfo) {
                const orgId = userInfo.org_id;

                try {
                    if (user === undefined || user === null) return;

                    const rowsDef: IGridRow[] = [];

                    const ref = await firestore.collection("machines").where("orgId", "==", orgId).get();
                    let i = 0;
                    ref.docs.forEach(doc => {
                        const machinesData = doc.data();
                        //console.log(machinesData.location);
                        const row = {
                            id: i++,
                            col1: machinesData.id,
                            col2: machinesData.type,
                            col3: `${machinesData.location.x_}, ${machinesData.location.N_}`
                        };

                        rowsDef.push(row);
                    });
                    setRows(rowsDef);
                } catch (err) {
                    console.log("User delete error: ", err);
                }
            }
        }

        getMachines();
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', width: 150},
        { field: 'col1', headerName: 'machine ID', width: 150, renderCell: (params: GridCellParams) => {return (<NavLink to="/index">{params.row.col1}</NavLink>)} },
        { field: 'col2', headerName: 'machine type', width: 150 },
        { field: 'col3', headerName: 'location', width: 150 },
    ];

    return (
        <div>
            <h1>MachineList</h1>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} className={classes.root}/>
            </div>
        </div>
    );
}

export default MachineList;