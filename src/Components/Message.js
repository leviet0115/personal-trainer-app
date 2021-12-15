import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { MessageContext } from "../Context/MessageContext";
import { useContext } from "react";

//style configuration
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

//MessageBar state and method
export default function MessageBar() {
  const classes = useStyles();

  const [message, setMessage] = useContext(MessageContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage({ ...message, open: false });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={message.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message.isDone ? "success" : "error"}
        >
          {message.isDone ? "Success!" : "Error!"}
        </Alert>
      </Snackbar>
    </div>
  );
}
