import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Tabs, Tab } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Customers from "./Customers";
import Trainings from "./Trainings";
import { MessageProvider } from "../Context/MessageContext";
import MessageBar from "./Message";
import FitnessCalendar from "./Calendar";
import Statistics from "./Statistics";

//TabPanel configuration
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabView() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  //handle Tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //styling appBar
  const appBarStyle = {
    height: "10vh",
    justifyContent: "center",
    fontWeight: "bold",
  };

  //render tab view
  return (
    <MessageProvider>
      <div className={classes.root}>
        <AppBar position="sticky" style={appBarStyle}>
          <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            <Tab label="Customers" {...a11yProps(0)} />
            <Tab label="Trainings" {...a11yProps(1)} />
            <Tab label="Training schedule" {...a11yProps(2)} />
            <Tab label="Statistics" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Customers>
            <MessageBar />
          </Customers>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Trainings endpoint="trainings">
            <MessageBar />
          </Trainings>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <FitnessCalendar />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Statistics />
        </TabPanel>
      </div>
    </MessageProvider>
  );
}
