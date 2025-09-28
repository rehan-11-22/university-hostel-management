import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, Label, Input, FormFeedback, Container, Row, Col, Spinner, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import { BASE_URL } from 'services/Helper';
import { useAlert } from 'contexts/AlertContext';
import { MDBDataTable } from 'mdbreact';

function EditModal(props) {
  const { isOpen, toggle, data } = props;
  const [isLoading, setIsLoading] = useState(false);

  const [hostelData, setHostelData] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [rooms, setRooms] = useState([]);
  const [stdRoom, setStdRoom] = useState("")

  const { request } = props;
  // console.log("model request",request);

  const showAlert = useAlert()

  const empDataUpdateSchema = Yup.object().shape({
    fullname: Yup.string().required('Full Name is required'),
    username: Yup.string().required('User Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    role: Yup.string().required('Role is required'),
  });


  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/hostel`)
      .then(response => {
        console.log("Hostel data response =>", response?.data?.hostelData);
        setHostelData(response.data.hostelData);
      })
      .catch(error => {
        console.error('Error fetching hostel data:', error)
      })
      .finally(() => {
        // setLoading(false)
      })
  }, []);
  const tableData = {
    columns: [
      {
        label: "Room No.",
        field: "roomNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Capacity",
        field: "capacity",
        sort: "asc",
        width: 270,
      },
      {
        label: "Availability",
        field: "availablity",
        sort: "asc",
        width: 200,
      },
      { label: "Action", field: "action", sort: "disabled", width: 100 },

    ],
    // rows: rooms,
    rows: rooms.map((room, key) => ({
      ...room,

      availablity: (
        rooms[key].capacity - rooms[key].students.length

      ),
      action: (
        <div className="flex-center">
          <Button className="me-1" color={rooms[key].capacity - rooms[key].students.length === 0 ? "danger" : "primary"} disabled={rooms[key].capacity - rooms[key].students.length === 0} size="sm" onClick={() => handleallocate(room._id)}>
            Allocate
          </Button>
        </div>
      )
    })),

  };

  const handleallocate = (roomId) => {
    setStdRoom(roomId)
    console.log("Room id for allocation ", roomId);
  }


  const handleHostelChange = (event) => {
    const hostelName = event.target.value;
    setSelectedHostel(hostelName);
    setSelectedFloor('');
    setRooms([]);
  };

  const handleFloorChange = (event) => {
    const floorNumber = event.target.value;
    setSelectedFloor(floorNumber);
    const selectedHostelObj = hostelData.find(hostel => hostel.name === selectedHostel);
    const floorObj = selectedHostelObj?.floors.find(floor => floor.floorNumber === Number(floorNumber));
    if (floorObj) {
      setRooms(floorObj.rooms);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log("updated values of profile ", values);

    try {
      if (request === "student") {
        await axios.post(`${BASE_URL}/api/v1/users/student/update`, { values, selectedHostel, selectedFloor, stdRoom });
      } else {
        await axios.post(`${BASE_URL}/api/v1/users/staff/update`, values);
      }
      // console.log("Response", res);
      window.notify("profile updated successfully", "success");
      // showAlert("profile updated successfully", "success")
      // alert('Employee profile updated successfully.');
      toggle()
    } catch (error) {
      console.log("Error at submitted modal data:", error);
      window.notify("profile not updated", "error");
      // showAlert("profile not updated", "error")
      // alert('Failed to update employee profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      style={{ position: 'absolute', top: '15px', right: '15px' }}
      onClick={toggle}
    >
      &times;
    </button>
  );

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} external={externalCloseBtn} centered='true'>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Formik initialValues={data} validationSchema={empDataUpdateSchema} onSubmit={handleSubmit}>
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                      <FormGroup>
                        <Label for="fullname">Full Name</Label>
                        <Input type="text" name="fullname" id="fullname" value={values.fullname}
                          onChange={handleChange} onBlur={handleBlur} invalid={touched.fullname && !!errors.fullname} />
                        {touched.fullname && errors.fullname ? <FormFeedback>{errors.fullname}</FormFeedback> : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="username">User Name</Label>
                        <Input type="text" name="username" id="username" value={values.username}
                          onChange={handleChange} onBlur={handleBlur} invalid={touched.username && !!errors.username} />
                        {touched.username && errors.username ? <FormFeedback>{errors.username}</FormFeedback> : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={values.email}
                          onChange={handleChange} onBlur={handleBlur} invalid={touched.email && !!errors.email} />
                        {touched.email && errors.email ? <FormFeedback>{errors.email}</FormFeedback> : null}
                      </FormGroup>
                      <FormGroup>
                        <Label for="role">Role</Label>
                        <Input type="text" name="role" id="role" disabled={request === "student"} value={values.role}
                          onChange={handleChange} onBlur={handleBlur} invalid={touched.role && !!errors.role} />
                        {touched.role && errors.role ? <FormFeedback>{errors.role}</FormFeedback> : null}
                      </FormGroup>
                      <Row hidden={request !== "student"}>
                        <Col md={6}>
                          <div className="form-group my-1">
                            <label htmlFor="hostel-select">Choose a Hostel:</label>
                            <select id="hostel-select" value={selectedHostel} onChange={handleHostelChange} className="form-control">
                              <option value="">Select Hostel</option>
                              {hostelData.map((hostel) => (
                                <option key={hostel._id} value={hostel.name}>{hostel.name}</option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        <Col md={6} >
                          <div className="form-group my-1">
                            <label htmlFor="floor-select">Choose a Floor:</label>
                            <select id="floor-select" value={selectedFloor} onChange={handleFloorChange} disabled={!selectedHostel} className="form-control">
                              <option value="">Select Floor</option>
                              {selectedHostel && hostelData.find(hostel => hostel.name === selectedHostel)?.floors.map((floor) => (
                                <option key={floor._id} value={floor.floorNumber}>{floor.floorNumber}</option>
                              ))}
                            </select>
                          </div>
                        </Col>
                      </Row>
                      <Row hidden={request !== "student"}>
                        <Col >
                          <div className='my-2'>
                            {/* <h3 className='fw-bold' >Rooms:</h3> */}
                            <div className='card p-2'>
                              {rooms.length > 0 ? (
                                < MDBDataTable responsive bordered data={tableData} />
                                // <Nav vertical >
                                //     {rooms.map((room) => (
                                //         <NavItem key={room._id} className='d-flex justify-content-around'>
                                //             <span>Room Number: {" " + room.roomNumber}</span> <span> Capacity: {" " + room.capacity}</span> <span> Available: {" " + room.isAvailable ? 'Yes' : 'No'}</span>
                                //         </NavItem>
                                //     ))}
                                // </Nav>
                              ) : <p>No rooms available for this floor.</p>}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {!stdRoom
                            ? <span className="text-danger">Room is not selected</span>
                            : <span className="text-success">Room is selected</span>
                          }
                        </Col>
                      </Row>
                      <Button className='px-4' type="submit" color="primary" disabled={isLoading}>
                        {!isLoading ? "Save Changes" : <Spinner size="sm" color="light" />}
                      </Button>{' '}
                      <Button color="secondary" onClick={toggle}>
                        Cancel
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditModal;
