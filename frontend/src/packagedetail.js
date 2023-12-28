import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./header/header";
import Footer from "./footer/footer";

const PackageDetail = () => {
  const [packageDetails, setPackageDetails] = useState(null);
  const { id } = useParams(); // This id should correspond to the package's identifier

  useEffect(() => {
    // Only run if ID is truthy
    if (id) {
      axios.get(`http://localhost:3000/packages/id/${id}`)
        .then(response => {
          // Directly check if the data has properties, indicating it's not empty
          if (response.data && Object.keys(response.data).length > 0) {
            setPackageDetails(response.data);
          } else {
            console.error('Package data is empty:', response.data);
            // You can set state here to show a message to the user, if desired
          }
        })
        .catch(error => {
          console.error('Error fetching package details:', error);
          // Handle the error state here, possibly updating the state to inform the user
        });
    }
  }, [id]); // Ensure id is a dependency
   

  if (!packageDetails) {
    return <div>Loading...</div>;
  }
    
  return (
    <>
        <Header />
        <section id="banner" className="package" style={{ background: `url(http://localhost:3000/uploads/${packageDetails.imageUrl}) 50% 50% no-repeat`, backgroundSize:'cover' }}>
            <div class="css-zixqbe e7svxqc1"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12  col-12">
                        <div class="inner_banner">
                            <h1>{packageDetails.packageName}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="package_details">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-12">
                        <h2>Overview</h2>
                        <div class="row">
                            <div class="col-lg-4 col-md-4 col-12">
                                <label>Duration</label>
                                <h3><iconify-icon icon="carbon:time"></iconify-icon> {packageDetails.packageDurationDate}</h3>
                            </div>
                            <div class="col-lg-8 col-md-8 col-12">
                                <label>Location</label>
                                <h3><iconify-icon icon="mingcute:location-line"></iconify-icon> {packageDetails.packageLocation}</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-12">
                                <p><b>{packageDetails.packageDiscription}</b><br/>
                                    <br/>
                                    <b>Aminities in hotel :</b> {packageDetails.animinitiesinhotlel} 
                                    <br/><br/><b>Just
                                        drop your luggage and stay comfortable with TPB</b></p>
                                <h5>Low Budget Package at affordable price</h5>
                                <p>Facilities</p>
                                <ul>
                                    <li><iconify-icon icon="fluent-mdl2:air-tickets"></iconify-icon> Air Ticket</li>
                                    <li><iconify-icon icon="ri:visa-line"></iconify-icon> Visa</li>
                                    <li><iconify-icon icon="fluent:food-16-regular"></iconify-icon> Hygenic Food</li>
                                    <li><iconify-icon icon="fontisto:hotel"></iconify-icon> Hotel</li>
                                    <li><iconify-icon icon="material-symbols:ac-unit"></iconify-icon> All Transportation in
                                        A/C coach</li>
                                    <li><iconify-icon icon="material-symbols:ac-unit"></iconify-icon> All Ziyarat in A/C
                                        coach</li>
                                    <li><iconify-icon icon="material-symbols:checkroom"></iconify-icon> Laundry</li>
                                    <li><iconify-icon icon="icon-park-outline:handbag"></iconify-icon> Hand bag + passport
                                        bag </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-12">
                        <div class="agent_card">
                            <h2><span>Total Price:</span>{packageDetails.packagePrice} </h2>
                            <hr />
                            <div class="ag_name">
                                <span><iconify-icon icon="dashicons:admin-users"></iconify-icon></span>
                                <h3>{packageDetails.agentName} </h3>
                            </div>
                            <hr />
                            <div class="pg_date">
                                <span>
                                    <label for="">Start Date</label>
                                    <h4>{packageDetails.packageDate} </h4>
                                </span>
                                <iconify-icon icon="uiw:date"></iconify-icon>
                            </div>
                            <div class="line_al">
                                <a href="contact_us.html" class="btn_yellow">Contact Now</a>
                                <a href="https://api.whatsapp.com/send?phone={packageDetails.agentNumber}" class="whatsapp"><iconify-icon icon="logos:whatsapp-icon"></iconify-icon></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="gallery">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-12">
                        <h2>Gallery</h2>
                    </div>
                </div>
                <div class="row">
                    <a href="assets/img/gl_1.jpg" data-toggle="lightbox" data-gallery="gallery" class="col-md-4">
                        <img src="assets/img/gl_1.jpg" class="img-fluid rounded"/>
                    </a>
                    <a href="assets/img/gl_2.jpg" data-toggle="lightbox" data-gallery="gallery" class="col-md-4">
                        <img src="assets/img/gl_2.jpg" class="img-fluid rounded"/>
                    </a>
                    <a href="assets/img/gl_3.jpg" data-toggle="lightbox" data-gallery="gallery" class="col-md-4">
                        <img src="assets/img/gl_3.jpg" class="img-fluid rounded"/>
                    </a>
                </div>
                <br />
                <div class="row">
                    <a href="assets/img/gl_3.jpg" data-toggle="lightbox" data-gallery="gallery" class="col-md-4">
                        <img src="assets/img/gl_3.jpg" class="img-fluid rounded"/>
                    </a>
                    <a href="assets/img/gl_1.jpg" data-toggle="lightbox" data-gallery="gallery" class="col-md-4">
                        <img src="assets/img/gl_1.jpg" class="img-fluid rounded"/>
                    </a>
                    <a href="assets/img/gl_2.jpg" data-toggle="lightbox" data-gallery="gallery" class="col-md-4">
                        <img src="assets/img/gl_2.jpg" class="img-fluid rounded"/>
                    </a>
                </div>
            </div>
        </section>
        <Footer/>
    </>
  );
};

export default PackageDetail;