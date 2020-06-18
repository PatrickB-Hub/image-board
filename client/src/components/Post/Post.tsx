import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Tooltip,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Grid,
} from "@material-ui/core";
import CameraAlt from "@material-ui/icons/CameraAlt";
import Location from "@material-ui/icons/LocationOn";

import { AppState } from "../../store/configureStore";

import { Post } from "../../types/Post";
import { User } from "../../types/User";

import { API_URL } from "../../utils/useFetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fafafa",
      marginBottom: 30,
    },
    item: {
      flexGrow: 1,
      maxWidth: 800,
    },
    cardHeader: {
      padding: 10,
      paddingLeft: 15,
    },
    userProfile: {
      margin: 0,
    },
    link: {
      color: "#666",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      marginBottom: 10,
    },
    detailsBox: {
      display: "flex",
      justifyContent: "space-between",
      alignContent: "bottom",
    },
    details: {
      display: "flex",
      paddingTop: 10,
    },
    cardDropdown: {
      fontSize: 16,
      paddingLeft: 16,
    },
    cardContent: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  })
);

interface SinglePostProps {
  post: Post;
}

type Props = SinglePostProps;

const SinglePost: React.FC<Props> = ({ post }) => {
  const classes = useStyles();

  const { camera, location, description, filePath, createdAt } = post;
  const username = post?.user?.username;
  const postUserId = post?.user?._id;

  return (
    <Grid item xs={12} sm={10} md={6} lg={4} className={classes.item}>
      <Card className={classes.root}>
        {/* card header with avatar, username and the upload date */}
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar
              alt={username}
              aria-label="post"
              style={{
                display: "inline-flex",
                backgroundColor: `#${
                  postUserId && postUserId.slice(postUserId.length - 3)
                }`,
                padding: 4,
                fontSize: 20,
              }}
            >
              {username?.substr(0, 1)}
            </Avatar>
          }
          title={
            <h3 className={classes.userProfile}>
              <Link
                className={classes.link}
                to={`/image-board/profile/${postUserId}`}
              >
                {username}
              </Link>
            </h3>
          }
          subheader={moment(createdAt).fromNow()}
        />

        {/* the image */}
        <CardMedia
          image={API_URL.substring(0, API_URL.length - 4) + filePath}
          className={classes.media}
        />

        {/* image description, location and camera */}
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginBottom: 10 }}
          >
            {description}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            className={classes.detailsBox}
          >
            {camera && (
              <span className={classes.details}>
                <Tooltip title="Camera used to take the picture">
                  <CameraAlt fontSize="small" style={{ marginRight: 5 }} />
                </Tooltip>
                {camera}
              </span>
            )}

            {location && (
              <span className={classes.details}>
                <Tooltip title="Location where the image was taken">
                  <Location fontSize="small" style={{ marginRight: 5 }} />
                </Tooltip>
                {location}
              </span>
            )}
          </Typography>
        </CardContent>
        <div style={{ height: "1px", backgroundColor: "#999" }} />
      </Card>
    </Grid>
  );
};

interface LinkStateProps {
  isAuthenticated: boolean;
  user: User;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

export default connect(mapStateToProps)(SinglePost);
