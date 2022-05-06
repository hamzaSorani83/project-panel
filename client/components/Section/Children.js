import {Form} from 'react-bootstrap'

export default function Children( { indexx } ) {
  return (
    <div className="children mx-4 my-5"  >
      <h2 className='text-center txt-color'>Child #{ indexx }</h2>
    <Form.Group className="mb-3" controlId="childrenTitle">
      <Form.Label>{'i'.repeat(indexx  + 1)}) Children Title</Form.Label>
      <Form.Control type="text"  placeholder="Enter children title" name={'children-title'} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="childrenDetails">
      <Form.Label>{'i'.repeat(indexx + 1)}) Children Details</Form.Label>
      <Form.Control type="text"  placeholder="Enter children details" name={'children-details'} />
    </Form.Group>
  </div>
  )
}
