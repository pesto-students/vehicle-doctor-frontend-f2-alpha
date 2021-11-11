import React from 'react';
import logo from '../../img/VehicleDr_logo.jpg';

function CustomerNav() {
    return (
        <div>
            <table>
                <tr>
                    <td>
                        <img alt="icon" src={logo} width="50px%" height="20px" />
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default CustomerNav;