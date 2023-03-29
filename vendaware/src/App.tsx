import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import { useAuth } from './components/Login/hooks/useAuth';
import { IUser } from 'components/common/interfaces/IUser';
import { firestore } from 'Storage';
import { LoginForm } from 'components/Login/LoginForm';
import { ProtectedRoute } from 'components/Login/ProtectedRoute';
import Home from './components/Home/Home';
import AdminMain from './components/Admin/AdminMain/AdminMain';

const App: React.FC = ():React.ReactElement => {

  const {user} = useAuth();
  const [currentUser, setCurrentUser] = React.useState<IUser|undefined>(undefined);
  
  React.useEffect( () => {
    const getUserData = async () => {
      try{
        if(user === undefined || user === null) return;
        const uDoc = await firestore.collection("users").doc(user.uid).get();

        if(uDoc.exists){
          const uData: IUser = uDoc.data() as IUser;       
          setCurrentUser(uData);    
        }
         
      } catch(err){
        console.log('Failed to get user: ', err);
      }
    }
    getUserData();
  }, [user]);

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route 
            exact={true}
            path={"/"}
            render={() => <LoginForm/>}
          />
          <ProtectedRoute authenticationPath={"/"}
                                path={"/index"}
                                component={Home}/>
          
          <ProtectedRoute authenticationPath={"/"}
                                path={"/machines"}
                                component={Home}/>
        
          <ProtectedRoute authenticationPath={"/"}
                                path={"/admin"}
                                component={AdminMain}/>
        </Switch>
    
      </div>
    </BrowserRouter>
  );
}

export default App;

