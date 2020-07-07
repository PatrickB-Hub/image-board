import React, { useState, useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Link } from "react-router-dom";
import moment from "moment";
import clsx from "clsx";
import { useConfirm } from "material-ui-confirm";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Tooltip,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  TextField,
  IconButton,
  Typography,
  Button,
  Popper,
  Grow,
  Grid,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CameraAlt from "@material-ui/icons/CameraAlt";
import Location from "@material-ui/icons/LocationOn";
import StarBorder from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import Send from "@material-ui/icons/Send";

import SingleComment from "./Comment";

import {
  updatePostRating,
  deletePost,
  addComment,
} from "../../actions/postActions";
import { AppState } from "../../store/configureStore";

import { Post } from "../../types/Post";
import { User } from "../../types/User";
import { AppActions } from "../../types/actions";
import { Comment } from "../../types/Comment";

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
    action: {
      alignSelf: "center",
      margin: 0,
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
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    commentContainer: {
      display: "flex",
      backgroundColor: "#fff",
      padding: "10px 2px 5px 10px",
      borderRadius: 5,
      marginTop: 20,
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    comments: {
      paddingTop: 0,
    },
    commentInput: {
      width: "100%",
      marginBottom: 5,
    },
  })
);

interface SinglePostProps {
  post: Post;
}

type Props = SinglePostProps & LinkStateProps & LinkDispatchProps;

const SinglePost: React.FC<Props> = ({
  isAuthenticated,
  user,
  post,
  updatePostRating,
  deletePost,
  addComment,
}) => {
  const confirm = useConfirm();
  const classes = useStyles();

  const {
    camera,
    location,
    description,
    filePath,
    rating,
    comments,
    createdAt,
  } = post;
  const { _id } = post;
  const username = post?.user?.username;
  const postUserId = post?.user?._id;
  const currentUserId = user._id;

  const [postRating, setPostRating] = useState<number | null>(
    rating ? rating.overallRating : null
  );
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleDelete = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    confirm({ description: "This will permanently delete your post." })
      .then(() => _id && deletePost(_id))
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(e.target as HTMLElement)
    )
      return;

    setOpen(false);
  };

  const handleRatingChange = (
    _e: React.ChangeEvent<{}>,
    newRating: number | null
  ) => {
    setPostRating(newRating);

    if (_id && newRating !== null) updatePostRating({ _id, rating: newRating });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addComment({
      postId: _id,
      user,
      message: commentInput,
      createdAt: new Date(),
    });
    setCommentInput("");
  };

  const deleteBtn = (
    <Tooltip title="Delete post">
      <IconButton size="small" aria-label="delete" onClick={handleDelete}>
        <DeleteIcon style={{ margin: 4 }} />
      </IconButton>
    </Tooltip>
  );

  return (
    <Grid item xs={12} sm={10} md={6} lg={4} className={classes.item}>
      <Card className={classes.root}>
        {/* card header with avatar, username and the upload date */}
        <CardHeader
          className={classes.cardHeader}
          classes={{ action: classes.action }}
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
          action={isAuthenticated && postUserId === currentUserId && deleteBtn}
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
                <Tooltip title="Location where the picture was taken">
                  <Location fontSize="small" style={{ marginRight: 5 }} />
                </Tooltip>
                {location}
              </span>
            )}
          </Typography>
        </CardContent>
        <div style={{ height: "1px", backgroundColor: "#999" }} />

        {/* overall rating and rating input */}
        <CardActions disableSpacing className={classes.cardDropdown}>
          <Tooltip
            title={`${rating?.overallRating?.toFixed(1)} based on 
                    ${rating?.totalRating} user ratings`}
          >
            <Star style={{ color: "gold", marginRight: 3 }} />
          </Tooltip>
          {rating?.overallRating?.toFixed(1)}
          <Tooltip title="Rate this post">
            <Button
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              style={{ marginLeft: 10 }}
              onClick={handleToggle}
              startIcon={<StarBorder />}
            >
              Rate post
            </Button>
          </Tooltip>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      <MenuItem onClick={handleClose}>
                        <Rating
                          max={10}
                          name="post-rating"
                          value={postRating}
                          onChange={handleRatingChange}
                        />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Tooltip title="Show and add comments">
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
        </CardActions>

        {/* Dropdown with comment section */}
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          className={classes.cardContent}
        >
          <CardContent className={classes.comments}>
            {/* render comments */}
            {comments?.map((comment, idx) => (
              <SingleComment key={idx} comment={comment} />
            ))}

            {/* comment form with input field */}
            <form onSubmit={handleCommentSubmit}>
              <div className={classes.commentContainer}>
                <TextField
                  autoFocus
                  multiline
                  label="Leave a comment"
                  type="text"
                  name="comment"
                  rowsMax="4"
                  className={classes.commentInput}
                  id="input-comment"
                  onChange={handleInputChange}
                  value={commentInput}
                />
                <IconButton type="submit" aria-label="submit">
                  <Send />
                </IconButton>
              </div>
            </form>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

interface LinkStateProps {
  isAuthenticated: boolean;
  user: User;
}

interface LinkDispatchProps {
  updatePostRating: (postData: { _id: string; rating: number }) => void;
  deletePost: (postId: string) => void;
  addComment: (commentData: Comment) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  updatePostRating: bindActionCreators(updatePostRating, dispatch),
  deletePost: bindActionCreators(deletePost, dispatch),
  addComment: bindActionCreators(addComment, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
