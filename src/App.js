import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import { useEffect, useState } from 'react'
import Searchitem from "./Searchitem";
import ApiRequest from "./ApiRequest";

function App() {
  const API_URL='http://localhost:3500/items';
    const [items,setItems]=useState([])
    const [isLoading,setIsLoading]=useState(true);
    const [fetchItems,setFetchItems]=useState(null);
    const [newItem,setNewItem]=useState('')
    const[Search,setSearch]=useState('')
    useEffect(()=>{
      const fetchItems = async ()=>{
        try{
          const response=await fetch(API_URL);
          if(!response.ok)throw Error('Data not found')
          const listItems=await response.json()
          setItems(listItems);
          setFetchItems(null);
        }catch(err){
          setFetchItems(err.message)
        }
        finally{
          setIsLoading(false);
        }
      }
      setIsLoading(true);
      setTimeout(()=>{
        (async ()=> await fetchItems())()
      },2000)
    },[Search])
    

    const addItem= async (item) => {
      const id=items.length ?(parseInt((items[items.length-1].id))+1).toString():'1';
      const addNewItem={id,checked:false,item}
      const listItems=[...items,addNewItem]
      setItems(listItems)
      
       const postOptions={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(addNewItem)
       }
       const result=await ApiRequest(API_URL,postOptions)
       if(result) setFetchItems(result)
    }

    const handlecheck = async (id) => { 
      const listItems =items.map((item) =>
       item.id===id ? {...item,checked: !item.checked}: item)
       setItems(listItems)
       const myItem=listItems.filter((item)=>item.id===id)
       const updateOptions={
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({checked:myItem[0].checked})
       }
       const reqUrl =`${API_URL}/${id}`
       const result= await ApiRequest(reqUrl,updateOptions)
       if(result) setFetchItems(result)
  }

    const handleDelete = async(id) => {
      const listItems =items.filter((item) => item.id!==id)
      setItems(listItems)
      const deleteOptions={method:'DELETE'}
      const reqUrl =`${API_URL}/${id}`
       const result= await ApiRequest(reqUrl,deleteOptions)
       if(result) setFetchItems(result)
    } 
    const handleSubmit = (e) => {
      e.preventDefault()
      if(!newItem) return;
      addItem(newItem)
      setNewItem('')
    }

  return (
    <div className="App">
      <Header />
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <Searchitem
      Search={Search}
      setSearch={setSearch}
      />
      <main>
      {fetchItems && <p>{`Error:${fetchItems}`}</p>}
      {isLoading && <p>.....Loading data</p>}
      {!isLoading&&!fetchItems&&<Content
         items={items.filter(item =>((item.item).toLowerCase())
          .includes(Search.toLowerCase()))}
         handlecheck={handlecheck}
         handleDelete={handleDelete}
      />}
      </main>
      <Footer 
      length={items.length }
      />
    </div>
  );
}

export default App;
