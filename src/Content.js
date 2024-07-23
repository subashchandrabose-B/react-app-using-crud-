import React from 'react'
import ItemsList from './ItemsList'     
  

const Content = ({items,handlecheck,handleDelete,}) => {

  return (
    <>
      {items.length ? (
        <ItemsList
        items={items}
        handlecheck={handlecheck}
        handleDelete={handleDelete}
        />
      ):(<p>Your list is empty..</p>)}
    </>
  )
}
export default Content