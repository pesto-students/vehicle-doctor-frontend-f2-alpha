import logo from '../img/logo.jpg';

function Testimonials() {
    return (
        <div id="rewards" style={{padding:'5%'}} className="anim altApp">
            <h3>TESTIMONIALS</h3>
            <p>See what our customers are saying about us</p>
            <div className="flex-container">
                <div className="ratingDiv">
                    <img src={logo} width="50px" height="50px" style={{borderRadius:'50%', border:'1px solid'}} alt="" />
                    <p>"A real life saver. Awesome customer service - not just from the Vehicle Dr. team but also from the on ground service partners. Goes to show the value they see in the platform. Highly recommended. Keep up!"</p>
                </div>
                <div className="ratingDiv">
                    <img src={logo} width="50px" height="50px" style={{borderRadius:'50%', border:'1px solid'}} alt="" />
                    <p>"A real life saver. Awesome customer service - not just from the Vehicle Dr. team but also from the on ground service partners. Goes to show the value they see in the platform. Highly recommended. Keep up!"</p>
                </div>
                <div className="ratingDiv" style={{ borderRadius: '10px', boxShadow: '0 0 5px 0.2px', flex: '20%', margin: '3%', padding: '10px' }}>
                    <img src={logo} width="50px" height="50px" style={{borderRadius:'50%', border:'1px solid'}} alt="" />
                    <p>"A real life saver. Awesome customer service - not just from the Vehicle Dr. team but also from the on ground service partners. Goes to show the value they see in the platform. Highly recommended. Keep up!"</p>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;