import React from 'react'
import { FaPlus  } from 'react-icons/fa'
import { useRef } from 'react'

const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const InputRef=useRef();
    const onClickButton=()=>{
      InputRef.current.focus()
    }
  return (
    <form className='addForm' name='form' onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add Item</label>
        <input
        ref={InputRef}
        autoFocus
        id='addItem'
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        />
        <button 
        type='submit'
        onClick={onClickButton}>
            <FaPlus />

        </button>
    </form>
  )
}

export default AddItem