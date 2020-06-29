import React, { useState, useEffect } from "react";
import apiData from "./api";
import PersonInfo from "./PersonInfo";
import { Contact } from "./types";

function App() {
  const [data, setData] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const contacts = await apiData();

      setData(data.concat(contacts));
    } catch (e) {
      console.log({ e });
    }
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
      <button className="btn--loadMore" onClick={() => fetchContacts()}>
        Load more
      </button>
    </div>
  );
}

export default App;
