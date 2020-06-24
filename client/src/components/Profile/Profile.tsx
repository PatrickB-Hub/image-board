import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useParams } from "react-router";
import { Paper, Button, Avatar, makeStyles, Grid } from "@material-ui/core";

import SinglePost from "../Post/Post";
import LoadingPosts from "../Post/LoadingPosts";

import {
  getProfile,
  followProfile,
  unfollowProfile,
} from "../../actions/profileActions";
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
  btnBlock: {
    marginTop: 5,
    marginBottom: 20,
  },
  btnFollow: {
    outline: "none",
    backgroundColor: "#3F51B5",
    color: "white",
    "&:hover": {
      color: "#3F51B5",
      borderColor: "#3F51B5",
      backgroundColor: "white",
    },
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
  user,
  posts,
  loadingProfile,
  loadingPosts,
  isAuthenticated,
  getProfile,
  getPosts,
  followProfile,
  unfollowProfile,
}) => {
  const classes = useStyles();
  const { userId } = useParams<{ userId: string }>();
  const { _id } = user;

  useEffect(() => {
    getPosts(userId);
    getProfile(userId);
  }, [userId, getPosts, getProfile]);

  const handleFollow = () => {
    userId && followProfile(userId);
  };

  const handleUnfollow = () => {
    userId && unfollowProfile(userId);
  };

  let items =
    posts && posts.map((post) => <SinglePost key={post._id} post={post} />);

  let profileInfo;

  if (profile && items) {
    const { email, username, followers, following } = profile;

    let followBtns;

    if (isAuthenticated) {
      if (_id && followers && !followers.includes(_id)) {
        followBtns = (
          <div className={classes.btnBlock}>
            <Button
              size="small"
              variant="outlined"
              className={classes.btnFollow}
              onClick={handleFollow}
            >
              Follow
            </Button>
          </div>
        );
      } else {
        followBtns = (
          <div className={classes.btnBlock}>
            <Button
              size="small"
              variant="outlined"
              className={classes.btnFollow}
              onClick={handleUnfollow}
            >
              Unfollow
            </Button>
          </div>
        );
      }
    }

    profileInfo = (
      <div>
        <Paper className={classes.paper}>
          <Avatar
            alt={username}
            style={{
              display: "inline-flex",
              backgroundColor: `#${userId.slice(userId.length - 3)}`,
              padding: 6,
              fontSize: 20,
            }}
          >
            {username?.substr(0, 2)}
          </Avatar>
          <h2 className={classes.username}>{username}</h2>
          {userId !== _id && followBtns}
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
      </div>
    );
  }

  return (
    <Grid container direction="column">
      {/* alignItems="center" */}
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
  followProfile: (userId: string) => void;
  unfollowProfile: (userId: string) => void;
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
  followProfile: bindActionCreators(followProfile, dispatch),
  unfollowProfile: bindActionCreators(unfollowProfile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
