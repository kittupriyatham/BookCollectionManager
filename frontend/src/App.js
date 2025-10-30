import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((oldKey) => oldKey + 1);

  return (
    <div className="App" style={{padding:20}}>
      <h1>Book List</h1>
      <BookForm onCreated={triggerRefresh} />
      <BookList key={refreshKey} />
    </div>
  );
}

export default App;
