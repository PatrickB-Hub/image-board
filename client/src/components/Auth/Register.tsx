import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Paper, TextField, Button, makeStyles } from "@material-ui/core";

import { registerUser } from "../../actions/userActions";
import { AppState } from "../../store/configureStore";

import { User } from "../../types/User";
import { Errors } from "../../types/Error";
import { AppActions } from "../../types/actions";

const useStyles = makeStyles({
  paper: {
    maxWidth: 500,
    padding: 20,
  },
  title: {
    textAlign: "center",
    margin: 0,
    color: "#3F51B5",
  },
  textField: {
    width: "100%",
    marginBottom: 5,
  },
  btnBlock: {
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
});

type Props = LinkStateProps & LinkDispatchProps;

const Register: React.FC<Props> = ({ registerUser, errors }) => {
  const history = useHistory();
  const classes = useStyles();

  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerUser(registerInfo, history);
  };

  return (
    <Paper className={classes.paper}>
      <h2 className={classes.title}>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          className={classes.textField}
          value={registerInfo.email}
          onChange={handleChange}
          name="email"
          helperText={errors.email ? errors.email : ""}
          error={errors.email ? true : false}
        />
        <TextField
          label="Username"
          type="text"
          name="username"
          value={registerInfo.username}
          onChange={handleChange}
          className={classes.textField}
          helperText={errors.username ? errors.username : ""}
          error={errors.username ? true : false}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={registerInfo.password}
          onChange={handleChange}
          className={classes.textField}
          helperText={errors.password ? errors.password : ""}
          error={errors.password ? true : false}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={registerInfo.confirmPassword}
          onChange={handleChange}
          className={classes.textField}
          helperText={errors.confirmPassword ? errors.confirmPassword : ""}
          error={errors.confirmPassword ? true : false}
        />
        <div className={classes.btnBlock}>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
};

interface LinkStateProps {
  errors: Errors;
}

interface LinkDispatchProps {
  registerUser: (userData: User, history: any) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  errors: state.errors,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  registerUser: bindActionCreators(registerUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
