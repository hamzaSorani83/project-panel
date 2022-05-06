import React from 'react'
import Link from "next/link";

export default function Pagination( {currentPage, next, prev} ) {
  const renderItem = (item) => (
    <li className={['page-item', item == currentPage ? 'active' : ''].join(' ')} key={item}>
      <Link href={'/projects/' + item}>
        <a className='page-link'>{ item }</a>
      </Link>
    </li>
  )
  
  let paginationItems = currentPage > 1 ?
    Array( +currentPage ).fill( ' ' )
      .map( ( _,index ) => renderItem( index + 1 ) )
    : <></>
  
  return (
    <nav aria-label="..." className="d-flex justify-content-end mt-3">
      <ul className="pagination">
        <li className={["page-item",  prev == null ? "disabled" : ''].join(' ')}>
          <Link href={'/projects/' + prev} >
            <a className="page-link" tabIndex="-1">Previous</a>
          </Link>
        </li>
        {
          paginationItems
        }
        <li className={["page-item",  next == null ? "disabled" : ''].join(' ')}>
          <Link href={'/projects/' + next}>
            <a className="page-link">Next</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
