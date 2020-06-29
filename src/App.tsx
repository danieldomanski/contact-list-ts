import React from "react";
import apiData from "./api";
import PersonInfo from "./PersonInfo";

function App() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  //  TODO fetch contacts using apiData function, handle loading and error states

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          // @ts-ignore
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
      </div>
    </div>
  );
}

export default App;
