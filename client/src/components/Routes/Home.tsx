import React from "react";
import { connect } from "react-redux";

import Login from "../Auth/Login";
import ListPosts from "../Post/ListPosts";

import { AppState } from "../../store/configureStore";

const Home: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  return <div>{isAuthenticated ? <ListPosts /> : <Login />}</div>;
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
