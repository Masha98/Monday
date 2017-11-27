var { Navbar, NavItem, Nav } = require('react-bootstrap')
let React = require('react')
const navbarInstance = ()=>{
  return <Navbar inverse>
    <Navbar.Collapse>
      {/*<Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Sseparated link</MenuItem>
        </NavDropdown>
      </Nav>*/}
      <Nav pullRight>
        <NavItem eventKey={1} href="localhost:3000/export-db">Export DB</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}
module.exports = navbarInstance
