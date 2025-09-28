import React from "react";
import { Box } from "@chakra-ui/react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Image from "../../../assets/img/avatar.png";
import { Icon } from "@chakra-ui/react";
import { FaUniversity } from "react-icons/fa";

import {
  MdHome,
  MdPhone,
  MdEmail,
  MdDataset,
  MdOutlinePermIdentity,
  MdCreditCard,
} from "react-icons/md";
import { useAuth } from "contexts/AuthContext";
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'

function Index() {
  const { user } = useAuth();
  // console.log("User data is ", user);

  return (
    <Box
      p={{ base: "130px", md: "80px", xl: "20px" }}
      className="p-4 rounded bg-white "
      style={{ marginTop: "90px" }}
    >
      <Container fluid>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody>
                <Row>
                  <Col md="12" xs="12">
                    {/* Profile Picture */}
                    <div className=" d-flex justify-content-center">
                      {/* <div className="cubic-image px-md-4" style={{width:"170px", height:"200px", }} >
                        <img
                          src={!user?.avatar ? Image : user?.avatar} // Replace with actual image URL
                          alt="Student"
                          className="img-fluid rounded-2 border border-2 shadow-sm"
                          width={"100%"}
                          height={"100%"}
                         
                        />
                      </div> */}
                      <div
                        className="cubic-image px-md-4"
                        style={{ width: "170px", height: "150px" }}
                      >
                        <img
                          src={!user?.avatar ? Image : user?.avatar} // Replace with actual image URL
                          alt="Student"
                          className="img-fluid rounded-2 border border-2 shadow-sm"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <div>
                        <h5 className="fs-3 mb-4 fw-bold mt-md-3">
                          {user?.fullname}
                        </h5>
                        <ul className="list-unstyled ">
                          <li className="mt-3">
                            <strong>
                              {" "}
                              <Icon
                                as={MdPhone}
                                width="15px"
                                height="15px"
                                color="inherit"
                              />
                              <span> </span>Phone:
                            </strong>{" "}
                            <a
                              href="tel:03084462753"
                              style={{ color: "#4361ee" }}
                            >
                              {user?.phoneNumber}
                            </a>
                          </li>
                          <li className="mt-3">
                            <strong>
                              <Icon
                                as={MdEmail}
                                width="15px"
                                height="15px"
                                color="inherit"
                              />{" "}
                              Email:
                            </strong>{" "}
                            <a
                              href="mailto:asadarshad0990@gmail.com"
                              style={{ color: "#4361ee" }}
                            >
                              {user?.email}
                            </a>
                          </li>
                          <li className="mt-3">
                            <strong>
                              <Icon
                                as={MdCreditCard}
                                width="15px"
                                height="15px"
                                color="inherit"
                              />
                              <span> </span>CNIC:
                            </strong>{" "}
                            {user?.cnic}
                          </li>
                          <li className="mt-3">
                            <strong>
                              <Icon
                                as={MdDataset}
                                width="15px"
                                height="15px"
                                color="inherit"
                              />{" "}
                              Date of Birth:
                            </strong>{" "}
                            {new Date(user?.dob).toLocaleDateString()}
                          </li>
                          <li className="mt-3">
                            <strong>
                              <Icon
                                as={MdOutlinePermIdentity}
                                width="15px"
                                height="15px"
                                color="inherit"
                              />{" "}
                              Gender:
                            </strong>{" "}
                            {user?.gender}
                          </li>
                          <li className="mt-3">
                            <strong>
                              <Icon
                                as={MdHome}
                                width="15px"
                                height="15px"
                                color="inherit"
                              />{" "}
                              Permanent Address:
                            </strong>{" "}
                            {user?.homeAdress}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {/* dlfjlskdj */}

          <Col md={6} className="mt-2 mt-md-0">
            <Card
              style={{ backgroundColor: "#90e0ef", borderRadius: "10px" }}
              className="px-2"
            >
              <CardBody>
                <Row>
                  <Col md="9" xs="12">
                    {/* Student Information */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "5px" }}>
                        <FaUniversity className="fs-4" />
                      </span>
                      <h5
                        className="fs-4 mb-1"
                        style={{ display: "inline-block", marginTop: "3px" }}
                      >
                        University Information
                      </h5>
                    </div>
                    <ul className="list-unstyled ">
                      <li className="">
                        <strong>Department:</strong> {user?.dept}
                      </li>
                      <li className="my-1">
                        <strong>Session:</strong> {user?.section}
                      </li>
                      <li className="my-1">
                        <strong>Registration NO:</strong> 2020-SIMOY-03406
                      </li>
                    </ul>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card
              className="mt-2 "
              style={{
                backgroundColor: "#f0f0f0",
                padding: "5px",
                borderRadius: "10px",
                marginBottom: "5px",
              }}
            >
              <CardBody>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "5px" }}>
                    <FaUniversity className="fs-4" />
                  </span>
                  <h5
                    className="fs-4 mb-1"
                    style={{ display: "inline-block", marginTop: "3px" }}
                  >
                    Hostal Information
                  </h5>
                </div>
                <Row>
                  <Col md="6" xs="12">
                    <ul className="list-unstyled">
                      <li>
                        <strong>Hostel Name:</strong> XYZ Hostel
                      </li>
                      <li>
                        <strong>Room Number:</strong> 101
                      </li>
                      <li>
                        <strong>Mess Attendance:</strong> 90%
                      </li>
                    </ul>
                  </Col>
                  <Col md="6" xs="12">
                    <ul className="list-unstyled">
                      <li>
                        <strong>Hostel Fee:</strong> Paid
                      </li>
                      <li>
                        <strong>Mess Fee:</strong> Unpaid
                      </li>
                    </ul>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default Index;
