import React from "react";
import Entry from "/src/components/Entry.jsx";
import emojipedia from "/src/emojipedia.js";

// function creatItem(item){
//  return <Entry key={item.id}
//  name={item.name}
//  emoji={item.emoji}
//  meaning= {item.meaning} />
// }

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map((item) => (
          <Entry
            key={item.id}
            name={item.name}
            emoji={item.emoji}
            meaning={item.meaning}
          />
        ))}
      </dl>
    </div>
  );
}

export default App;
