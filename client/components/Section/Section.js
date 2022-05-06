import {  useState } from "react";
import { Form } from "react-bootstrap"
import Children from "./Children";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Section( { indexx, removeSectionHandler } ) {
  const [ children, setChildren ] = useState( [] );
  const addChildrenHandler = ( e ) => {
    let count = +e.target.value ;
    if ( count >= 0 ) {
      setChildren(
        new Array( count ).fill(' ').map( (_, index) => (
          <Children key={index} indexx={index}></Children>
        ))
      )
    }
  }
  
  return (
    <div className="section p-3 mb-3" datatype={indexx} >
      <Form.Group className="mb-3 position-relative" controlId="section ">
      <button
        className="btn btn-danger removeSectionBtn"
        onClick={(e) => {removeSectionHandler(e)}}
      >
        <FontAwesomeIcon icon={ faMinus }></FontAwesomeIcon>
      </button>
        <Form.Label>Section Name</Form.Label>
        <Form.Control type="text" placeholder="Enter section name"  name={'section-name'}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="childrenCount">
        <Form.Label>Children Count</Form.Label>
        <Form.Control type="number" name='count' placeholder="Enter children count" min="0" onChange={addChildrenHandler} style={ { maxWidth: '200px' } } />
      </Form.Group>
      {children}
    </div>
  )
}
