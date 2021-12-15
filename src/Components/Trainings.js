import React from "react";
import { fetchAll, deleteObject, addObject } from "./RestRequest";
import MaterialTable from "material-table";
import MessageBar from "./Message";
import { MessageContext } from "../Context/MessageContext";

const Trainings = ({ customerLink }) => {
  //data store in state and const
  const [trainings, setTrainings] = React.useState([]);
  const [message, setMessage] = React.useContext(MessageContext);
  const endpoint = "trainings";
  const MTableTitlte = ({ title }) => <h1>{title}</h1>;

  //table configuration
  const columns = [
    {
      title: "Date",
      field: "date",
      type: "datetime",
      defaultSort: "desc",
      align: "left",
    },
    {
      title: "Duration (minutes)",
      field: "duration",
      type: "numeric",
      align: "left",
    },
    {
      title: "Activity",
      field: "activity",
      type: "text",
      align: "left",
    },
  ];

  const options = {
    headerStyle: { fontWeight: "bold" },
    addRowPosition: "first",
    exportButton: true,
    sorting: true,
    exportAllData: true,
  };

  //handle CRUD result
  const showMessage = (result) => {
    if (result) {
      fetchAll(
        typeof customerLink === "undefined" ? endpoint : customerLink.slice(39)
      ).then((data) =>
        setTrainings(
          data.content[0].hasOwnProperty("activity") ? data.content : []
        )
      );
      setMessage({ open: true, isDone: true });
    } else {
      setMessage({ ...message, open: true });
    }
  };

  //CRUD table configuration
  const editable = {
    onRowDelete: (row) =>
      new Promise((resolve) => {
        setTimeout(() => {
          deleteObject(row.links[1].href).then((result) => showMessage(result));
          resolve();
        }, 1000);
      }),

    onRowAdd: (row) =>
      new Promise((resolve) => {
        console.log(customerLink.slice(0, -9));
        let object = {
          ...row,
          customer: customerLink.slice(0, -9),
        };
        setTimeout(() => {
          addObject(endpoint, object).then((result) => showMessage(result));
          resolve();
        }, 1000);
      }),
  };

  //fetch training's data
  React.useEffect(
    () =>
      fetchAll(
        typeof customerLink === "undefined" ? endpoint : customerLink.slice(39)
      ).then((data) => {
        console.log(data);
        setTrainings(
          data.content[0].hasOwnProperty("activity") ? data.content : []
        );
      }),
    [customerLink, setTrainings]
  );

  //render to the training tab
  if (typeof customerLink === "undefined") {
    return (
      <div>
        <MaterialTable
          data={trainings}
          columns={columns}
          options={options}
          title={<MTableTitlte title="Training reservations" />}
          editable={{ onRowDelete: editable.onRowDelete }}
          style={{
            padding: "2rem 5rem",
          }}
        />
        <MessageBar />
      </div>
    );
  } //render to the customer tab
  else {
    return (
      <div>
        <MaterialTable
          title="Training reservations"
          data={trainings}
          columns={columns}
          options={options}
          editable={editable}
          style={{
            padding: "2rem 5rem",
          }}
        />
        <MessageBar />
      </div>
    );
  }
};
export default Trainings;
