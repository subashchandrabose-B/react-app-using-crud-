// Importing necessary components and hooks
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import { useEffect, useState } from 'react';
import SearchItem from "./SearchItem";
import ApiRequest from "./ApiRequest";

function App() {
  // API URL for fetching items
  const API_URL = 'http://localhost:3500/items';

  // State hooks for managing various states
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  // useEffect hook for fetching items on component mount and when 'search' state changes
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Data not found');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, [search]);

  // Function to add a new item
  const addItem = async (item) => {
    const id = items.length ? (parseInt(items[items.length - 1].id) + 1).toString() : '1';
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    };
    const result = await ApiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  // Function to handle checkbox change
  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  // Function to handle item deletion
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {isLoading && <p>.....Loading data</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;

