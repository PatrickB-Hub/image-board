import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Tooltip,
  Fab,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CameraAlt from "@material-ui/icons/CameraAlt";
import Location from "@material-ui/icons/LocationOn";
import Description from "@material-ui/icons/Description";
import { DropzoneArea } from "material-ui-dropzone";

import { addPost } from "../../actions/postActions";

import { Post } from "../../types/Post";
import { AppActions } from "../../types/actions";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
  },
  addBtn: {
    position: "fixed",
    left: "50%",
    bottom: 15,
    transform: "translateX(-50%)",
    padding: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  dialogContent: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsInput: {
    width: "47%",
  },
  descriptionInput: {
    marginBottom: 20,
  },
});

interface PostInput {
  camera: string;
  location: string;
  description: string;
  files: File[];
}

type Props = LinkDispatchProps;

const TestPost: React.FC<Props> = ({ addPost }) => {
  const classes = useStyles();

  const initialPostInputState: PostInput = {
    camera: "",
    location: "",
    description: "",
    files: [],
  };

  const [open, setOpen] = useState(false);
  const [postInput, setPostInput] = useState<PostInput>(initialPostInputState);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setPostInput(initialPostInputState);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInput({
      ...postInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropzoneChange = (files: File[]) => {
    setPostInput({
      ...postInput,
      files,
    });
  };

  const handleSubmit = () => {
    addPost(postInput);
    setPostInput(initialPostInputState);
    handleClose();
  };

  return (
    <div className={classes.container}>
      <Tooltip
        title="Post your own picture"
        aria-label="add"
      >
        <Fab color="primary" onClick={handleOpen} className={classes.addBtn}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ zIndex: 10001 }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Post a picture</DialogTitle>
        <DialogContent>
          <div className={classes.dialogContent}>
            <TextField
              label="Camera"
              name="camera"
              autoFocus
              className={classes.detailsInput}
              id="input-camera"
              onChange={handleInputChange}
              value={postInput.camera}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CameraAlt />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Location"
              name="location"
              className={classes.detailsInput}
              id="input-lense"
              onChange={handleInputChange}
              value={postInput.location}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Location />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <TextField
            label="Description"
            fullWidth
            multiline
            rowsMax="4"
            name="description"
            className={classes.descriptionInput}
            id="input-description"
            onChange={handleInputChange}
            value={postInput.description}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
            }}
          />
          <DropzoneArea
            onChange={handleDropzoneChange}
            filesLimit={1}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            maxFileSize={5000000}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

interface LinkDispatchProps {
  addPost: (postData: Post) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  addPost: bindActionCreators(addPost, dispatch),
});

export default connect(null, mapDispatchToProps)(TestPost);
