import React, { useEffect, useState, useContext } from "react";
import { fetchAll, deleteObject, addObject, updateObject } from "./RestRequest";
import MaterialTable from "material-table";
import { MessageContext } from "../Context/MessageContext";
import MessageBar from "./Message";
import Trainings from "./Trainings";

const Customers = () => {
  //data store in sate and const
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useContext(MessageContext);
  const endpoint = "customers";
  const MTableTitlte = ({ title }) => <h1>{title}</h1>;

  //Table configuration
  const columns = [
    { title: "First name", field: "firstname", defaultSort: "asc" },
    { title: "Last name", field: "lastname" },
    { title: "Street address", field: "streetaddress" },
    { title: "Postcode", field: "postcode" },
    { title: "City", field: "city" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ];

  const options = {
    exportButton: true,
    addRowPosition: "first",
    sorting: true,
    exportAllData: true,
    headerStyle: { fontWeight: "bold" },
    detailPanelType: "single",
  };

  const detailPanel = (rowData) => {
    return <Trainings customerLink={rowData.links[2].href} />;
  };

  //handle CRUD result
  const showMessage = (result) => {
    if (result) {
      fetchAll(endpoint).then((data) => setCustomers(data.content));
      setMessage({ open: true, isDone: true });
    } else {
      setMessage({ ...message, open: true });
    }
  };

  //CRUD functions in the table configuration
  const editable = {
    onRowAdd: (row) =>
      addObject(endpoint, row).then((result) => showMessage(result)),

    onRowDelete: (row) =>
      deleteObject(row.links[1].href).then((result) => showMessage(result)),

    onRowUpdate: (row) =>
      updateObject(row.links[1].href, row).then((result) =>
        showMessage(result)
      ),
  };

  //fetch customer data
  useEffect(
    () => fetchAll(endpoint).then((data) => setCustomers(data.content)),
    []
  );

  //render to customer tab
  return (
    <div>
      <MaterialTable
        title={<MTableTitlte title="Customers" />}
        data={customers}
        columns={columns}
        options={options}
        editable={editable}
        detailPanel={detailPanel}
        style={{
          padding: "2rem 5rem",
          margin: "4rem 0rem",
        }}
      />
      <MessageBar />
    </div>
  );
};

export default Customers;
