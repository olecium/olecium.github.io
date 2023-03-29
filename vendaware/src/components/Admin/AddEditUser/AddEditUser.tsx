import React from "react";
import css from "./AddEditUser.module.scss";
import {firestore} from "../../../Storage";
import {IErrorMap} from "../../common/interfaces/IError";
import {IUser} from "../../common/interfaces/IUser";
import {useLocation} from "react-router";
import { useAuth } from '../../Login/hooks/useAuth';
import { IRole } from './../../common/interfaces/IRole';
import { IOrg } from './../../common/interfaces/IOrg';
import { NavLink } from "react-router-dom";
import { resetPassword } from './../../common/utils/resetPassword';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

type SetStringState = (value: (((prevState: string) => string) | string)) => void;

const AddEditUser: React.FC = (): React.ReactElement => {

    const {user} = useAuth();
    const query = useQuery();

    const [queryId, setQueryId] = React.useState<string>(``);
    const [message, setMessage] = React.useState<string>(``);
    const [email, setEmail] = React.useState<string>(``);
    const [forename, setForname] = React.useState<string>(``);
    const [surname, setSurname] = React.useState<string>(``);
    const [role, setRole] = React.useState<string>(``);
    const [roles, setRoles] = React.useState<IRole[]>([]);
    const [org, setOrg] = React.useState<string>(``);
    const [orgs, setOrgs] = React.useState<IOrg[]>([]);
    const [errors, setErrors] = React.useState<IErrorMap>({});

    React.useEffect(() => {
        const userId = query.get(`id`) || false;

        if(userId){
            setQueryId(userId);
            getUserData(userId);
        }
    }, [user]);

    React.useEffect(() => {
        const getRoles = async (): Promise<void> => {
            try {
                if(user === undefined || user === null) return;
                const rolesSnapshot = await firestore.collection('roles').get();

                const roles: IRole[] = [];
                rolesSnapshot.docs.forEach(doc => {
                    const d = doc.data();

                    const r: IRole = {
                        id: d.id,
                        name: d.name
                    }
                    roles.push(r);
                });
                
                setRoles(roles);
                
            } catch(err) {
                console.log(`Error getting document: `, err);
            }
        }
        getRoles();        
    }, [roles])

    React.useEffect(() => {
        const getOrgs = async (): Promise<void> => {
            try {
                if(user === undefined || user === null) return;
                const orgsSnapshot = await firestore.collection('organisations').get();

                const orgs: IOrg[] = [];
                orgsSnapshot.docs.forEach(doc => {
                    const d = doc.data();

                    const r: IOrg = {
                        id: d.id,
                        name: d.name,
                        country: d.country,
                        email: d.email,
                        telephone: d.telephone
                    }
                    orgs.push(r);
                });
                
                setOrgs(orgs);
                
            } catch(err) {
                console.log(`Error getting document: `, err);
            }
        }
        getOrgs();        
    }, [orgs])

    const changeItemValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setState: SetStringState, fieldName: string): void => {
        const v = e.target.value as string;
        setState(v);
    }

    const setFieldError = (fieldName: string) => {
        setErrors(prevState => ({...prevState, [fieldName]: {field: fieldName, error: `${fieldName}`}}));
    }

    const getUserData = async (userId: string): Promise<void> => {
        const doc = await firestore.collection('users').doc(userId).get();
        try {
            if(doc.exists){
                const u: IUser = doc.data() as IUser;
                setEmail(u.email);
                setForname(u.forename);
                setSurname(u.surname);
                setRole(u.role_id);
                setOrg(u.org_id);
            }
        } catch(err) {
            console.log(`Error getting document: `, err);
        }
    }

    const onUserAddEdit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setErrors({});

        let hasError: boolean = false;

        if(!email) {
            hasError = true;
            setFieldError(`Email`);
        }

        if(!forename) {
            hasError = true;
            setFieldError(`Forename`);
        }

        if(!surname) {
            hasError = true;
            setFieldError(`Surame`);
        }

        if(!role) {
            hasError = true;
            setFieldError(`Role`);
        }

        if(!org) {
            hasError = true;
            setFieldError(`Organisation`);
        }

        if (!hasError) {
            const authorid = (!queryId)
            ? firestore.collection('users').doc().id
            : queryId;

            await firestore.collection('users').doc(authorid).set({
                id: authorid,
                email: email,
                forename: forename,
                surname: surname,
                role_id: role,
                org_id: org
            });        
        }

        if(!queryId) {
           
            resetPassword(email);

            setMessage("User sucessfully added!");
            setTimeout(function(){ setMessage(``); }, 3000);

            setEmail(``);
            setForname(``);
            setSurname(``);
            setRole(``);
            setOrg(``);
        } else {
            //await getUserData(queryId);
            setMessage("User sucessfully edited!");
            setTimeout(function(){ setMessage(``); }, 3000);
        }
        setErrors({});

    }

    return(
        <div>
            <h1 className={css.primary_title}>{(queryId !== '') ? `Edit User` : `Add User`}</h1>
            {message &&
                <div className={css.message}>
                    <p>{message}</p>
                </div>
            }
            { (Object.keys(errors).length > 0)  &&
                <div className={css.form_errors}>
                    <p>Mandatory fields: </p>
                    <ul>
                        {
                            Object.values(errors).map((x, i) =>
                                <li className={css.form_errors__error} key={i}>{x.error}</li>
                            )
                        }
                    </ul>
                </div>
            }
            <form>
                <ul className={css.form_fields}>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="email">Email</label>
                        <input className={css.field_input} type="text" name="email" value={email} onChange={(e) => changeItemValue(e, setEmail, 'email')}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="forename">Forename</label>
                        <input className={css.field_input} type="text" name="forename" value={forename} onChange={(e) => changeItemValue(e, setForname, 'forename')}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="surname">Surname</label>
                        <input className={css.field_input} type="text" name="surname" value={surname} onChange={(e) => changeItemValue(e, setSurname, 'surname')}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="role">Role</label>
                        <select className={css.field_select} name="role" id="role" value={role} onChange={(e) => changeItemValue(e, setRole, 'role')}>
                            <option>Select role</option>
                            {
                                roles.map((r) =>
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                )
                            }
                        </select>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="org">Organisation</label>
                        <select className={css.field_select} name="org" id="org" value={org} onChange={(e) => changeItemValue(e, setOrg, 'org')}>
                            <option>Select organisation</option>
                            {
                                orgs.map((o) =>
                                    <option key={o.id} value={o.id}>{o.name}</option>
                                )
                            }
                        </select>
                    </li>
                    <li className={css.form_buttons}>
                        <button className={css.button_primary} type="submit" onClick={onUserAddEdit}>{ (queryId !== '') ? 'Save changes' : 'Add User'}</button>
                        <NavLink className={`${css.button_primary} ${css.danger}`} to={`users`}>Cancel</NavLink>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default AddEditUser;