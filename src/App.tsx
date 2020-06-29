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

  const handleSelect = function (selectedItem: Contact) {
    const index = selectedItemIndex(selectedItem.id);

    if (index > -1) {
      selected.splice(index, 1);
      setSelected([...selected]);
      return;
    }

    setSelected(selected.concat(selectedItem));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const selectedItemIndex = (id: string) =>
    selected.map((s) => s.id).indexOf(id);

  return (
    <div className="App">
      <div className="selected">
        <p>Selected contacts: {selected.length}</p>
        <ul className="list" data-testid="selected-list">
          {selected.map((personInfo) => {
            return (
              <li
                key={personInfo.id}
                className="person-info person-info--selected"
                onClick={() => handleSelect(personInfo)}
              >
                <PersonInfo data={personInfo} />
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="list">
        {data.map((personInfo) => {
          const isSelected = selectedItemIndex(personInfo.id) > -1;
          return isSelected ? null : (
            <li
              key={personInfo.id}
              className="person-info"
              onClick={() => handleSelect(personInfo)}
            >
              <PersonInfo data={personInfo} />
            </li>
          );
        })}
      </ul>
      <div>{renderFetchStatus()}</div>

      <button className="btn--loadMore" onClick={() => fetchContacts()}>
        Load more
      </button>
    </div>
  );
}

export default App;
