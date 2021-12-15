import React from "react";

export const MessageContext = React.createContext([[], () => {}]);

export const MessageProvider = (props) => {
  const [message, setMessage] = React.useState({
    open: false,
    isDone: false,
  });

  return (
    <MessageContext.Provider value={[message, setMessage]}>
      {props.children}
    </MessageContext.Provider>
  );
};
