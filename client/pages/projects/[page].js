import {Fragment, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import axios from '../../components/axiosInstance/axios';
import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import CustomModal from '../../components/Modal/Modal';

const PROJECTSLIMIT = 7;

export default function Projects( {projectsData, currentPage,nextPageUrl, prevPageUrl} ) {
  const [ isDeleted,setIsDeleted ] = useState( false );
  const [ message,setMessage ] = useState( false );
  
  
  const deleteHandler = ( e, id ) => {
    disabledHandler()
    axios.post( `/project/delete/${ id }` )
      .then( res => {
        setIsDeleted( true );
        setMessage( 'deleted successfully' );
        e.target.parentElement.parentElement.remove();
        enabledHandler();
      } )
      .catch( err => {
        setIsDeleted( false );
        setMessage( 'ooops! there is an error' );
      } );
    }
  
  const projectsTableHead = [
    "id",
    "project name",
    "date",
    "action",
  ];
  
  const disabledHandler = () => {
    document.querySelectorAll('.btn-action').forEach(btn => {
      btn.classList.add( 'disabled' );
    });
  }
  
  const enabledHandler = () => {
    document.querySelectorAll('.btn-action').forEach(btn => {
      btn.classList.remove( 'disabled' );
    });
  }
  
  const renderHead = ( item,index ) => <th key={ index }>{ item }</th>;
  
  const renderBody = ( item,index ) => {
    return (
      <tr key={ index }>
        <td>{ item.id }</td>
        <td>{ JSON.parse(item.project_details)['project-name'] }</td>
        <td>{ item.created_at }</td>
        <td className='d-flex align-items-center'>
          <Link href={`/projects/show/${ item.id }`} >
            <a className='btn btn-outline-primary btn-action'  onClick={disabledHandler}>Show</a>
          </Link>
          <div className="btn btn-outline-danger btn-action m-1" onClick={(e) => deleteHandler(e, item.id)}>Delete</div>
        </td>
      </tr>
    );
  };
  
  return (
    <Fragment>
      <Head>
        <title>Projects</title>
      </Head>
      <Header />
      <div className='card container mt-3'>
        <h2 className='text-center main-color mb-3'>Projects</h2>
        <div className="card__body">
          <Table
            headData={ projectsTableHead }
            renderHead={ ( item,index ) => renderHead( item,index ) }
            bodyData={ projectsData }
            renderBody={ ( item,index ) => renderBody( item,index ) }
            limit={ 2 }
            next={nextPageUrl !== null ? +currentPage + 1 : nextPageUrl}
            prev={prevPageUrl !== null ? +currentPage - 1 : prevPageUrl}
            currentPage={currentPage}
          >
          </Table>
        </div>
      </div>
      <CustomModal
        title="delete project Status: "
        show={ isDeleted }
        hideHandler={ () => setIsDeleted( false ) }
        message={message}
      />
    </Fragment>
  )
}


export async function getServerSideProps( context ) {
  let response = await axios.get( '/project/all?per_page=' + PROJECTSLIMIT + '&page=' + context.params.page );
  return {
    props: {
      projectsData: response.data.data,
      prevPageUrl: response.data.prev_page_url,
      nextPageUrl: response.data.next_page_url,
      currentPage: context.params.page,
    }
  }
}
