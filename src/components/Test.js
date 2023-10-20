import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { BsFill1CircleFill, BsFill2CircleFill, BsFillBackspaceFill } from "react-icons/bs";
import logo from "../assets/img/logo.png";

export function Test() {
  return <>
    <SidebarMenu className='m-3'>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          <img src={logo} />
        </SidebarMenu.Brand>
        <SidebarMenu.Toggle />
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <BsFill1CircleFill />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              Menu item title
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Sub>
          <SidebarMenu.Sub.Toggle>
            <SidebarMenu.Nav.Icon />
            <SidebarMenu.Nav.Title>
              Submenu title
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Sub.Toggle>
          <SidebarMenu.Sub.Collapse>
            <SidebarMenu.Nav>
              <SidebarMenu.Nav.Link>
                <SidebarMenu.Nav.Icon>
                  <BsFill2CircleFill />
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>
                  Submenu item title
                </SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
            </SidebarMenu.Nav>
          </SidebarMenu.Sub.Collapse>
        </SidebarMenu.Sub>
      </SidebarMenu.Body>
    </SidebarMenu>
  </>
}