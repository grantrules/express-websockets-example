import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const ClientContext = React.createContext({});

function ClientProvider({ children }) {

    const [client,setClient] = React.useState(null);

    useEffect(() => {
        console.log("using effect");
        const client = new WebSocket('ws://localhost:4000/doink');
        
        client.onopen = () => {
            console.log('Connected to server');
        };
        client.onclose = () => {
            console.log('Disconnected from server');
        };
        client.onmessage = (event) => {
            console.log('Message received:', event.data);
        };
        setClient(client);
    }, []);


    
  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  );
}

ClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useClient() {
  return useContext(ClientContext);
}

export { ClientContext, ClientProvider, useClient };