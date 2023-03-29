import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(props.editMode);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () =>{
        setEditMode(true);
    }

    const closeEditMode = () => {        
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }
    
    return(
        <div className="status">
            { !editMode && 
                <p onDoubleClick={activateEditMode}>{status || "---------"}</p>
            }
            { editMode && 
                <input type="text" onBlur={closeEditMode} autoFocus={true} onChange={onStatusChange} value={status}/>
            }
        </div>
    );
}
export default ProfileStatus;