import Sidebar from "../components/Sidebar/Sidebar"
import { Form } from "react-bootstrap"
import classes from '../styles/dashboard.module.css'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import Section from "../components/Section/Section"
import axios from "../components/axiosInstance/axios"
import CustomModal from '../components/Modal/Modal'

export default function AddProject() {
  const newSection = <Section key={0} indexx={0} />
  const [ section,setSection ] = useState( [newSection] );
  const [ isAdded,setIsAdded ] = useState( false );
  const [ message,setMessage ] = useState();
  
  const addSectionHandler = ( e ) => {
    e.preventDefault();
    setSection([
      ...section,
      <Section key={section.length} indexx={section.length}  removeSectionHandler={ removeSectionHandler }/>
    ]
    );
  }
  
  const removeSectionHandler = ( e ) => {
    e.preventDefault();
    let element = e.target.parentElement.parentElement;
    if ( element.getAttribute( 'datatype' ) ) {
      element.style.display = 'none';
    } else if( element.parentElement.getAttribute( 'datatype' )){
      element.parentElement.style.display = 'none'
    } else {
      element.parentElement.parentElement.style.display = 'none'
    }
  }
  
  const sumbitHandler = (e) => {
    e.preventDefault();
    let form = e.target;
    let projectName,sectionName, childName, childDetails;
    projectName = form[ 'project-name' ];
    let data = {
      "project-name": projectName.value,
      sections: [],
    };
    projectName.value = '';
    let sections = form.querySelectorAll( '.section' );
    sections.forEach( (section) => {
      sectionName = section.querySelector('input[name="section-name"]');
      let children = section.querySelectorAll( '.children' );
      if ( children.length === 0 ) {
        data = {
          ...data,
          sections: [
            ...data.sections,
            {
              "section-name": sectionName.value,
            }
          ]
        }
      }
      children.forEach(child => {
        childName = child.querySelector('input[ name="children-title" ]');
        childDetails = child.querySelector('input[name= "children-details" ]');
        data = {
          ...data,
          sections: [
            ...data.sections,
            {
              "section-name": sectionName.value,
              children: [
                {
                  "child-name": childName.value,
                  "child-details": childDetails.value,
                }
              ],
            }
          ]
        }
        childName.value = '';
        childDetails.value = '';
      } );
      sectionName.value = '';
      section.querySelector('input[name="count"]').value = '';
    } );
    let formData = new FormData();
    formData.append( 'project_details',JSON.stringify( data ) );
    
    axios.post( '/project/add', formData)
      .then( res => {
        setIsAdded( true );
        setMessage( 'Added successfully' );
        setSection( [newSection] );
      } )
      .catch( err => {
        setIsAdded( false );
        setMessage( 'network error' );
      } )
  }
  
  
  return (
    <div className={[classes.Dashboard, 'm-5'].join(' ')}>
      <Sidebar dashboardName="Projects Dashboard"/> 
      <Form onSubmit={sumbitHandler} className="add-project p-3">
        <Form.Group className="mb-3" controlId="projectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control type="text" placeholder="Enter project name"  name='project-name'/>
        </Form.Group>
        {
          section.map(el => el)
        }
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
          <button
            className="btn btn-primary"
            onClick={addSectionHandler}
          >
            <FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
          </button>
        </div>
      </Form>
      <CustomModal
        title="Add project Status: "
        show={ isAdded }
        message={message}
        hideHandler={ () => { setIsAdded( false ); } }
      />
    </div>
  )
}
