import React from "react";
import axios from "axios";
import "./custom.css";

class AddnewPackage extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        axios
            .post("http://localhost:3000/upload", data)
            .then((response) => {
                console.log(response.data); // Check the response from the server
                alert("File uploaded successfully");
            })
            .catch((error) => {
                console.error(error);
                alert("Error in file upload");
            });
    };

    render() {
        return (
            <>
                <section id="table_form">
                    <div class="container">
                        <div className="inner_table_form">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form_heading">
                                        <h1>Add New Package</h1>
                                        {/* <p>Fill out a few details to start receiving payments directly to your bank account</p> */}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form_details">
                                        <div class="col-lg-12 col-md-12 col-12">
                                            <div class="image_in"></div>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-12">
                                            <div class="ctcp_forms">
                                                <form class="row g-3" onSubmit={this.handleSubmit}>
                                                    <div class="col-lg-12 col-md-12 col-12">
                                                        <div class="ctcp_form_inp">
                                                            <label for="Image">UPLOAD IMAGE</label>
                                                            <input type="file" name="image" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <div class="ctcp_form_inp">
                                                            <label for="Package Name">PACKAGE NAME</label>
                                                            <input type="text" class="form-control" placeholder="Enter your package name" name="packageName" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <div class="ctcp_form_inp">
                                                            <label for="Package Name">CATEGORY</label>
                                                            <select name="packageCategory" required>
                                                                <option value="">Select a Category</option>
                                                                <option value="POPULAR PACKAGES">POPULAR PACKAGES</option>
                                                                <option value="DUBAI PACKAGES">DUBAI PACKAGES</option>
                                                                <option value="KASHMIR FAMILY PACKAGES">KASHMIR FAMILY PACKAGES</option>
                                                            </select>
                                                            {/* <input type="text" class="form-control" placeholder="Enter your package name" name="packageCategory" /> */}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <label for="Location">LOCATION</label>
                                                        <div class="ctcp_form_inp">
                                                            <input type="text" class="form-control" id="inputPassword4" placeholder="Enter your location" name="packageLocation" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <div class="ctcp_form_inp">
                                                            <label for="Price">TOTAL PRICE</label>
                                                            <input type="text" class="form-control" placeholder="Enter your price" name="packagePrice" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <label for="Date">START DATE</label>
                                                        <div class="ctcp_form_inp">
                                                            <input type="date" class="form-control" id="inputPassword4" name="packageDate" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <label for="text">DURATION</label>
                                                        <div class="ctcp_form_inp">
                                                            <input type="text" class="form-control" id="inputPassword4" placeholder="Duration" name="packageDurationDate" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <label for="text">PACKAGE DISCRIPTION</label>
                                                        <div class="ctcp_form_inp">
                                                            <textarea id="w3review" name="packageDiscription" rows="5" cols="51"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <label for="text">AMINITIES IN HOTEL</label>
                                                        <div class="ctcp_form_inp">
                                                            <textarea id="w3review" name="animinitiesinhotlel" rows="5" cols="51"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <div class="ctcp_form_inp">
                                                            <label for="text">AGENT NAME</label>
                                                            <input type="text" class="form-control" placeholder="Enter your Name" name="agentName" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-12">
                                                        <label for="number">AGENT NUMBER</label>
                                                        <div class="ctcp_form_inp">
                                                            <input type="tel" class="form-control" id="inputPassword4" placeholder="Enter your number" name="agentNumber" />
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="ctcp_form_btn">
                                                            <button type="submit">Publish</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default AddnewPackage;
