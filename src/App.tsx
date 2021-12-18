import React, { useEffect } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider, connect, useSelector } from "react-redux";
import store from './redux/redux-state';
import { withSuspense } from './hoc/withSuspense';
import { Header } from './components/Header/Header';
import ProfileContainer from './components/Profile/Profile';
import { UserPage } from './pages/Users/UserPage';
import Music from './pages/Music/Music';
import News from './pages/News/News';
import Settings from './pages/Settings/Settings';
import { LoginPage } from './components/Login/Login';
import './App.css';
import { getAuth } from './selectors/selectors';

const ChatContainer = React.lazy(() => import('./pages/Chat/Chat'));
//@ts-ignore
const UserProfileContainer = React.lazy(() => import('./components/UserProfile/UserProfileContainer'));
//@ts-ignore
const MainContainer = React.lazy(() => import('./pages/Main/Main'));
const SuspenceChat = withSuspense(ChatContainer);
const UserProfile = withSuspense(UserProfileContainer);
const Main = withSuspense(MainContainer);



// type MapPropsType = ReturnType<typeof mapStateToProps>
// type DispatchPropsType = {}
let data = localStorage.getItem('isAuth');
const App = () => {
  const auth = useSelector(getAuth);

  useEffect(() => {
    localStorage.setItem('isAuth', 'yes');
    <Redirect to="/main" />
  }, [auth]);

  if (!!auth || data === 'yes') {
    return (
      <div className="app-wrapper">
        <Header />
        {/* <div className="content-image"></div> */}
        <div className="information">
          <ProfileContainer />
          <div className="container">
            <Route path="/chat"
              render={() => <SuspenceChat />} />
            <Route path="/main"
              render={() => <Main />} />
            <Route path='/searching' render={() => <UserPage />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/user-profile/:userId?" render={() => <UserProfile />} />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Header />
        <Route path="/login" render={() => <LoginPage />} />
      </>
    )
  }
}
// class App extends React.Component<MapPropsType & DispatchPropsType> {
// componentDidUpdate(prevProps: MapPropsType) {
//   if (prevProps.authorized !== this.props.authorized) {
//     localStorage.setItem('isAuth', 'yes');
//     <Redirect to="/main" />
//   }
// }
// render() {

//   if (this.props.authorized || data === 'yes') {
//     return (
//       <div className="app-wrapper">
//         <Header />
//         <div className="content-image"></div>
//         <NavBar />
//         <div className="information">
//           <ProfileContainer />
//           <div className="container">
//             <Route path="/dialogs"
//               render={() => <SuspenceDialog />} />
//             <Route path="/main"
//               render={() => <Main />} />
//             <Route path='/searching' render={() => <UserPage />} />
//             <Route path="/music" render={() => <Music />} />
//             <Route path="/news" render={() => <News />} />
//             <Route path="/settings" render={() => <Settings />} />
//             <Route path="/user-profile/:userId?" render={() => <UserProfile />} />
//           </div>
//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <>
//         <Header />
//         <Route path="/login" render={() => <LoginPage />} />
//       </>
//     )
//   }


// }
// }


// const mapStateToProps = (state: AppStateType) => ({
//   authorized: state.auth.isAuth
// });

// let AppContainer = compose<ComponentType>(
//   withRouter,
//   connect(mapStateToProps)
// )(App);


let SamuraiJSContainer: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      < App />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSContainer;
