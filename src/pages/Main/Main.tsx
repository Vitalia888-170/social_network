import React from "react";
import { useSelector } from "react-redux";
import { getPosts } from "../../selectors/selectors";
import { actions } from "../../redux/post-reducer";
import { AddMessageForm } from "../../components/AddMessageForm/AddMessageForm";
import Profile from "./Profile/Profile";
const styles = require("./main.module.css");


const Main: React.FC = () => {
  const posts = useSelector(getPosts);
	console.log(posts);

  return (
    <div className={styles.mainContainer}>
      <Profile />
      <div className={styles.postContainer}>
        <div className={styles.content}>
          <AddMessageForm
					callback={actions.addPost}
					placeholder="Share your thoughts..."
					btnTitle="Add post"
					/>
        </div>
      </div>
    </div>
  );
};

export default Main;
