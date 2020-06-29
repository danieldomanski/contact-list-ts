import React, { useState, useEffect } from "react";
import apiData from "./api";
import { PersonInfo, ErrorBox, LoadingBox } from "./components";
import { Contact } from "./types";

function App() {
  const [data, setData] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact[]>([]);
  const [fetchState, setFetchState] = useState({
    hasError: false,
    isFetching: false,
  });

  const fetchContacts = async () => {
    try {
      setFetchState({ hasError: false, isFetching: true });
      const contacts = await apiData();

      setData(data.concat(contacts));
      setFetchState({ hasError: false, isFetching: false });
    } catch (e) {
      setFetchState({ hasError: true, isFetching: false });
    }
  };

  const renderFetchStatus = () => {
    const { hasError, isFetching } = fetchState;

    if (hasError || isFetching) {
      return hasError ? <ErrorBox /> : <LoadingBox />;
    }

    return null;
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
      </div>
      <div>{renderFetchStatus()}</div>

      <button className="btn--loadMore" onClick={() => fetchContacts()}>
        Load more
      </button>
    </div>
  );
}

export default App;
