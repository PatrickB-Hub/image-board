import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useParams } from "react-router";
import { Paper, Avatar, makeStyles, Grid } from "@material-ui/core";

import SinglePost from "../Post/Post";
import LoadingPosts from "../Post/LoadingPosts";

import { getProfile } from "../../actions/profileActions";
import { getPosts } from "../../actions/postActions";
import { AppState } from "../../store/configureStore";

import { User } from "../../types/User";
import { Post } from "../../types/Post";
import { AppActions } from "../../types/actions";

const useStyles = makeStyles({
  paper: {
    maxWidth: 500,
    padding: 10,
    margin: "30px auto",
  },
  username: {
    display: "inline-block",
    marginTop: 0,
    marginLeft: 15,
    color: "#666",
  },
  email: {
    color: "#666",
    marginBottom: 10,
  },
  detailsBlock: {
    display: "flex",
    color: "#666",
  },
  detail: {
    marginRight: 10,
    fontWeight: "bold",
  },
  detailTitle: {
    marginLeft: 3,
    fontSize: 14,
    fontWeight: "normal",
  },
  loader: {
    alignSelf: "center",
  },
  item: {
    flexGrow: 1,
    maxWidth: 800,
  },
});

type Props = LinkStateProps & LinkDispatchProps;

const Profile: React.FC<Props> = ({
  profile,
  posts,
  loadingProfile,
  loadingPosts,
  getProfile,
  getPosts,
}) => {
  const classes = useStyles();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    getPosts(userId);
    getProfile(userId);
  }, [userId, getPosts, getProfile]);

  let items =
    posts && posts.map((post) => <SinglePost key={post._id} post={post} />);

  let profileInfo;

  if (profile && items) {
    const { email, username, followers, following } = profile;

    profileInfo = (
      <Paper className={classes.paper}>
        <Avatar
          alt={username}
          style={{
            display: "inline-flex",
            backgroundColor: `#${userId.slice(userId.length - 3)}`,
            padding: 6,
            fontSize: 26,
          }}
        >
          {username?.substr(0, 2)}
        </Avatar>
        <h2 className={classes.username}>{username}</h2>
        <div className={classes.email}>{email}</div>
        <div style={{ height: "1px", backgroundColor: "#999" }} />
        <div className={classes.detailsBlock}>
          <div className={classes.detail}>
            {items.length}
            <span className={classes.detailTitle}>Posts</span>
          </div>
          <div className={classes.detail}>
            {followers ? followers.length : 0}
            <span className={classes.detailTitle}>Followers</span>
          </div>
          <div className={classes.detail}>
            {following ? following.length : 0}
            <span className={classes.detailTitle}>Following</span>
          </div>
        </div>
      </Paper>
    );
  }

  return (
    <Grid container direction="column">
      <Grid item>{!loadingProfile && profileInfo}</Grid>
      <Grid container justify="space-evenly" alignContent="center" spacing={3}>
        {loadingPosts ? <LoadingPosts /> : items}
      </Grid>
    </Grid>
  );
};

interface LinkStateProps {
  profile: User;
  user: User;
  loadingProfile: boolean;
  posts: Post[];
  loadingPosts: boolean;
  isAuthenticated: boolean;
}

interface LinkDispatchProps {
  getProfile: (userId: string) => void;
  getPosts: (userId: string) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  profile: state.profile.user,
  user: state.user.user,
  loadingProfile: state.profile.loading,
  posts: state.post.posts,
  loadingPosts: state.post.loading,
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  getProfile: bindActionCreators(getProfile, dispatch),
  getPosts: bindActionCreators(getPosts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
