import React from 'react';
import { Button } from 'react-bootstrap';
// import logo from '../img/service.jpg';
function Home() {
    return (
        <div id="home" className="homeDiv altApp anim">
            <table>
                <tr>
                    <td>
                        <h1 style={{ color: 'white' }}>BEST AUTO SERVICE IS ONE CLICK AWAY</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 style={{ color: 'white' }}>India's most trusted auto service repairs network</h5>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="mobile" id="mNum" name="mNum" placeholder="Enter your Mobile No." />
                        <Button  size="lg" variant="primary">Send OTP</Button>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default Home;