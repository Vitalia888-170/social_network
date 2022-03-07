import React, { useEffect } from 'react';
import { getUserProfile } from '../../redux/userProfile-reducer';
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import UserProfile from './UserProfile';
import { getCurrentUserProfile } from '../../selectors/selectors';

type PathParamsType = {
   userId: string
}

const UserProfileContainer: React.FC<RouteComponentProps<PathParamsType>> = (props) => {
   const profile = useSelector(getCurrentUserProfile);
   const dispatch = useDispatch();
   const userId: number | null = +props.match.params.userId;

   const refreshMain = () => {
      dispatch(getUserProfile(userId));
   }

   useEffect(() => {
      refreshMain();
   }, []);

   useEffect(() => {
      refreshMain();
   }, [userId]);


   if (!profile) {
      return <Preloader isFetching={true} />
   } else {
      return <UserProfile profile={profile} />
   }
}

const UserProfileRouter = withRouter(UserProfileContainer);
export default UserProfileRouter;


