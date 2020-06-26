import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Grid } from "@material-ui/core";

import SinglePost from "./Post";
import LoadingPosts from "./LoadingPosts";

import { getPosts, getPostsByFollowedUsers } from "../../actions/postActions";
import { AppState } from "../../store/configureStore";

import { Post } from "../../types/Post";
import { AppActions } from "../../types/actions";

interface ListPostsProps {
  allPosts: boolean;
}

type Props = ListPostsProps & LinkStateProps & LinkDispatchProps;

const ListPosts: React.FC<Props> = ({
  posts,
  loading,
  allPosts,
  getPosts,
  getPostsByFollowedUsers,
}) => {
  useEffect(() => {
    allPosts ? getPosts() : getPostsByFollowedUsers();
  }, [allPosts, getPosts, getPostsByFollowedUsers]);

  const items = posts.map((post) => <SinglePost key={post._id} post={post} />);

  return (
    <div>
      {loading ? (
        <LoadingPosts />
      ) : (
        <Grid container justify="space-evenly" spacing={3}>
          {items}
        </Grid>
      )}
    </div>
  );
};

interface LinkStateProps {
  posts: Post[];
  loading: boolean;
}

interface LinkDispatchProps {
  getPosts: () => void;
  getPostsByFollowedUsers: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  posts: state.post.posts,
  loading: state.post.loading,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  getPosts: bindActionCreators(getPosts, dispatch),
  getPostsByFollowedUsers: bindActionCreators(
    getPostsByFollowedUsers,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);
