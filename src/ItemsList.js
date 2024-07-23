import React from 'react'
import LineItems from './LineItems'

const ItemsList = ({items,handlecheck,handleDelete}) => {
  return (
    <ul>
          {items.map((item) =>(
             <LineItems
             item={item}
             handlecheck={handlecheck}
             handleDelete={handleDelete}
             key={item.id}
             />
          ))}
        </ul>
  )
}

export default ItemsList