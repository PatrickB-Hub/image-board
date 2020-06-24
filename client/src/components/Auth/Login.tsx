import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Paper, TextField, Button, makeStyles } from "@material-ui/core";

import { loginUser } from "../../actions/userActions";
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
    marginBottom: 30,
    marginTop: 20,
  },
  registerLink: {
    marginBottom: 0,
    fontSize: 14,
  },
});

type Props = LinkStateProps & LinkDispatchProps;

const Login: React.FC<Props> = ({ loginUser, isAuthenticated, errors }) => {
  const classes = useStyles();
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/image-board/");
    }
  }, [isAuthenticated, history]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser(loginInfo);
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <h2 className={classes.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            className={classes.textField}
            value={loginInfo.email}
            onChange={handleChange}
            name="email"
            helperText={errors.email ? errors.email : ""}
            error={errors.email ? true : false}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            className={classes.textField}
            helperText={errors.password ? errors.password : ""}
            error={errors.password ? true : false}
          />
          <div className={classes.btnBlock}>
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </div>
        </form>
        <p className={classes.registerLink}>
          Not registered? <Link to="/image-board/register">Sign up now</Link>.
        </p>
      </Paper>
    </div>
  );
};

interface LinkStateProps {
  isAuthenticated: boolean;
  errors: Errors;
}

interface LinkDispatchProps {
  loginUser: (userData: User) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  isAuthenticated: state.user.isAuthenticated,
  errors: state.errors,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  loginUser: bindActionCreators(loginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
