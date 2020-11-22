import {Navbar} from 'react-bootstrap'
import icon from './logo.svg';
function Nav(){
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={icon}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                    Testcase Generator
                </Navbar.Brand>
        </Navbar>
    );
}

export default Nav;