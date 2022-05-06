import {  createRef, useEffect } from 'react'
import classes from './Sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faBars, faProjectDiagram,faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useRouter } from 'next/router';

const SidebarItems = [
  {
    displayName: 'dashbaord',
    route: '/',
    icon: faRectangleList
  },
  {
    displayName: 'add projects',
    route: '/add-project',
    icon: faSquarePlus
  },
  {
    displayName: 'projects',
    route: '/projects/1',
    icon: faProjectDiagram
  },
];

export default function Sidebar({dashboardName}) {
  const sidebarRef = createRef();
  
  const router = useRouter();
  
  const handleToggleSidebar = () => {
    sidebarRef.current.classList.toggle( classes.Close );
    sidebarRef.current.classList.toggle( classes.Open );
    let sidebarWidth = getComputedStyle( document.documentElement ).getPropertyValue( "--sidebar-width" ).trim();
    document.documentElement.style.setProperty(
      "--sidebar-width",
      sidebarWidth === '300px' ? '100px' : '300px'
    );
  }
  
  useEffect( () => {
    if ( sidebarRef && sidebarRef.current && sidebarRef.current.classList !== null ) {
      if ( window.innerWidth < 800 ) {
        sidebarRef.current.classList.add( classes.Close );
        sidebarRef.current.classList.remove( classes.Open );
        document.documentElement.style.setProperty("--sidebar-width","100px");
      } else {
        sidebarRef.current.classList.add( classes.Open );
        sidebarRef.current.classList.remove( classes.Close );
        document.documentElement.style.setProperty("--sidebar-width","300px");
      }
      window.addEventListener( 'resize',function () {
        if ( window.innerWidth < 800 ) {
          sidebarRef.current.classList.add( classes.Close );
          sidebarRef.current.classList.remove( classes.Open );
          document.documentElement.style.setProperty("--sidebar-width","100px");
        } else {
          sidebarRef.current.classList.add( classes.Open );
          sidebarRef.current.classList.remove( classes.Close );
          document.documentElement.style.setProperty("--sidebar-width","300px");
        }
      })
    }
  }, [])
  
  return (
    <div ref={ sidebarRef } className={ [ classes.Sidebar,classes.Open ].join(' ')}>
      <div className={classes.Sidebar_Logo}>
        <FontAwesomeIcon icon={faBars} onClick={handleToggleSidebar}></FontAwesomeIcon>
        <span> {dashboardName} </span>
      </div>
      <ul className={['list-unstyled'].join(' ')}>
        { SidebarItems.map( ( item,index ) => {
          return (
            <li className={router.pathname == item.route ? classes.Active : ''} key={ index }>
              <Link href={ item.route } passHref>
                <div className={classes.Sidebar_Item_Inner}>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.displayName}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
