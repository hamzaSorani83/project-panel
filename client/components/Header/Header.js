import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'
import Link from 'next/link'

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" className='second-bg '>
      <Container>
      <Navbar.Brand >Projects Panel</Navbar.Brand>
      <Nav className="me-auto">
        <li className='nav-item'>
          <Link href='/'>
            <a className='nav-link' >Home</a>
          </Link>
        </li>
        <li className='nav-item'>
          <Link href='/add-project'>
            <a className='nav-link'>Add Project</a>
          </Link>
          </li>
        <li className='nav-item'>
          <Link href='/projects/1'>
            <a className='nav-link'>Projects </a>
          </Link>
        </li>
      </Nav>
      </Container>
    </Navbar>
  )
}
