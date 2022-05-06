import { Accordion } from "react-bootstrap";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../components/Header/Header";
import axios from "../../../components/axiosInstance/axios";
import Head from "next/head";

export default function ShowProject( { project } ) {
  return (
    <>
      <Head>
        <title>{project['project-name']}</title>
      </Head>
    <Header />
    <Accordion defaultActiveKey="0" className="container mt-5">
      <h2 className="text-center main-color">{ project['project-name'] }</h2>
      {
        project.sections.map( (section, index) => (
          <Accordion.Item eventKey={index} key={index} className='position-relative'>
            <Accordion.Header >
              { section['section-name'] }
              <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
            </Accordion.Header>
            <Accordion.Body key={ index }>
              {
                section.children ? 
                section.children.map( (child, index) => (
                  <div key={index}>
                    <div className="bd-callout txt-color">
                      { 'i'.repeat( index + 1 ) }) { child['child-name'] }
                    </div>
                    <div className=" txt-color text-muted mx-3" >
                      { child['child-details'] }
                    </div>
                  </div>
                ) )
                : <p className="text-center mt-3"> No Children To Show </p>
              }
            </Accordion.Body>
          </Accordion.Item>
        ))
      }
    </Accordion>
    </>
  )
}


export async function getStaticPaths() {
  const response = await axios.get( '/project/all' );
  const projects = response.data.data;
  
  const paths = projects.map( ( project ) => ( {
    params: { id: project.id.toString() },
  } ) );
  
  return {
    paths,
    fallback: 'blocking',
  }
} 


export async function getStaticProps( {params} ) {
  const response = await axios.get( `/project/get/${ params.id }` );
  let project = JSON.parse( response.data.project.project_details );
  return {
    props: {
      project: project,
    }
  }
}