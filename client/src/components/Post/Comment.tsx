import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Paper, makeStyles } from "@material-ui/core";
import moment from "moment";

import { Comment } from "../../types/Comment";

const useStyles = makeStyles({
  paper: {
    minHeight: 60,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    overflowWrap: "break-word",
    wordWrap: "break-word",
    wordBreak: "break-word",
    hyphens: "auto",
  },
  userDetails: {
    wordWrap: "break-word",
    display: "flex",
    justifyContent: "space-between",
  },
  colorBand: {
    minWidth: 10,
    margin: "4px 10px 4px 4px",
  },
  user: {
    marginTop: 0,
    marginBottom: 10,
  },
  time: {
    marginLeft: 10,
    color: "#bbb",
    fontSize: 12,
  },
});

interface SingleCommentProps {
  comment: Comment;
}

type Props = SingleCommentProps;

const SingleComment: React.FC<Props> = ({ comment }) => {
  const classes = useStyles();

  const { message, createdAt } = comment;

  return (
    <Paper className={classes.paper}>
      <div className={classes.userDetails}>
        <div
          className={classes.colorBand}
          style={{
            backgroundColor: `#${
              comment.user &&
              comment.user._id &&
              comment.user._id.slice(comment.user._id.length - 3)
            }`,
          }}
        />
        <div>
          <h3 className={classes.user}>
            <Link
              to={`/image-board/profile/${comment.user && comment.user._id}`}
            >
              {comment.user && comment.user.username}
            </Link>
            <span className={classes.time}>{moment(createdAt).fromNow()}</span>
          </h3>
          {message}
        </div>
      </div>
    </Paper>
  );
};

export default connect(null)(SingleComment);
