import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import {
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Spinner,
} from "reactstrap";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "services/Helper";
import { MDBDataTable } from "mdbreact";
import { departments } from "api/restApi/departmentApi";

const initialData = {
    username: "",
    email: "",
    // password: "",
    fullname: "",
    religion: "",
    homeAdress: "",
    phoneNumber: "",
    matrialStatus: "",
    nationality: "",
    state: "",
    city: "",
    cnic: "",
    dob: "",
    avatar: null,
    gender: "",
    dept: "",
    discipline: "",
    section: "",
    session: "",
    rollNumber: "",
};
function Index() {
    const [formData, setFormData] = useState(initialData)
    const [imageUrl, setImageUrl] = useState(null)
    const [gender, setGenger] = useState("female")
    const [isLoading, setIsLoading] = useState(false)
    const [hostelData, setHostelData] = useState([]);
    const [selectedHostel, setSelectedHostel] = useState('');
    const [selectedFloor, setSelectedFloor] = useState('');
    const [rooms, setRooms] = useState([]);
    const [stdRoom, setStdRoom] = useState("")

    // const showAlert = useAlert()
    // const [loading, setLoading] = useState(true);

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
    const data = {
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log("name =>", name);
        // console.log("value =>", value);
        setFormData((formData) => ({ ...formData, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        formData.avatar = imageUrl
        formData.gender = gender
        formData.roomId = stdRoom
        formData.hostelName = selectedHostel
        console.log("Student formdata =>", formData)
        axios.post(`${BASE_URL}/api/v1/users/student/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log("Student Registration res ==>", res?.data?.message);
                window.notify(res?.data?.message, "success");
                // showAlert(res?.data?.message, "success")
                // window.notify(res?.data?.message, "success")
            })
            .catch((err) => {
                window.notify("Somthing went wrong", "error");
                // showAlert("Somthing went wrong", "error")
                console.log("Error at register User ", err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="mt-2">
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <h3 className="card-title text-center mb-4 fs-3 fw-bold">
                                    Student Enrollment Form
                                </h3>

                                <Form onSubmit={handleSubmit}>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="username">
                                                    Username <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    //   value={username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="fullname">
                                                    Full Name <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    //   value={fullname}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="email">
                                                    Email <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    //   value={email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md={4}>
                                            <FormGroup>
                                                <Label for="password">
                                                    Password <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    min={8}
                                                    //   value={email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col> */}
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="phoneNumber">
                                                    Phone Number <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="tel"
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    //   value={phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="cnic">
                                                    CNIC <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="cnic"
                                                    id="cnic"
                                                    //   value={cnic}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="religion">
                                                    Religion <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="religion"
                                                    id="religion"
                                                    //   value={religion}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="matrialStatus">
                                                    Marital Status <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="select"
                                                    name="matrialStatus"
                                                    id="matrialStatus"
                                                    //   value={maritalStatus}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                    <option value="Divorced">Divorced</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="nationality">
                                                    Nationality <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="nationality"
                                                    id="nationality"
                                                    //   value={nationality}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="state">
                                                    State <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    //   value={state}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="city">
                                                    City <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    //   value={city}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="homeAdress">
                                                    Home Address <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="homeAdress"
                                                    id="homeAdress"
                                                    //   value={address}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="dob">
                                                    Date of Birth <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="date"
                                                    name="dob"
                                                    id="dob"
                                                    //   value={dob}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label htmlFor="avatar">
                                                    Avatar <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="file"
                                                    id="avatar"
                                                    onChange={(e) => setImageUrl(e.target.files[0])}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="mt-4">
                                            <FormGroup tag="fieldset">
                                                <h4
                                                    className="fw-bold mt-md-3"
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        marginLeft: "5px",
                                                    }}
                                                >
                                                    Gender :
                                                </h4>
                                                <FormGroup check inline>
                                                    <Label check>
                                                        <Input
                                                            type="radio"
                                                            name="gender"
                                                            value="male"

                                                            onChange={(e) => { setGenger(e.target.value) }}

                                                        />{" "}
                                                        Male
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Label check>
                                                        <Input
                                                            type="radio"
                                                            name="gender"
                                                            value="female"
                                                            checked
                                                            onChange={(e) => { setGenger(e.target.value) }}

                                                        />{" "}
                                                        Female
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Label check>
                                                        <Input
                                                            type="radio"
                                                            name="gender"
                                                            value="other"

                                                            onChange={(e) => { setGenger(e.target.value) }}
                                                        />{" "}
                                                        Other
                                                    </Label>
                                                </FormGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {/* departmantal informantion */}
                                    <Row>
                                        <h2 className="card-title text-center fs-4 fw-bold my-3">
                                            University Details
                                        </h2>
                                    </Row>

                                    <Row>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="dept">
                                                    Department <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="select"
                                                    name="dept"
                                                    id="dept"
                                                    //   value={maritalStatus}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Department</option>
                                                    {departments.map((department, key) => {
                                                        return <option key={key} value={department.department_name}>{department.department_name}</option>
                                                    })
                                                    }

                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="city">
                                                    Discipline <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="select"
                                                    name="discipline"
                                                    id="discipline"
                                                    //   value={maritalStatus}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Discipline</option>
                                                    {departments.map((department, key) => {
                                                        return <option key={key} value={department.discipline}>{department.discipline}</option>
                                                    })
                                                    }

                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="session">
                                                    Session <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="session"
                                                    id="session"
                                                    //   value={city}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="section">
                                                    Mor/Eve <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="select"
                                                    name="section"
                                                    id="section"
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Session</option>
                                                    <option value="morning">Morning</option>
                                                    <option value="evening">Evening</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="rollNumber">
                                                    Roll Number <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="rollNumber"
                                                    id="rollNumber"
                                                    //   value={city}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
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
                                    <Row>
                                        <Col >
                                            <div className='my-2'>
                                                {/* <h3 className='fw-bold' >Rooms:</h3> */}
                                                <div className='card p-2'>
                                                    {rooms.length > 0 ? (
                                                        < MDBDataTable responsive bordered data={data} />
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
                                    {!stdRoom
                                        ? <span className="text-danger">Room is not selected</span>
                                        : <span className="text-success">Room is selected</span>
                                    }
                                    <div className="text-center mt-md-3">
                                        <Button color="primary" type="submit">
                                            {!isLoading
                                                ? "Register Student"
                                                : <><Spinner size="sm">Loading...</Spinner><span>{' '}Loading</span></>
                                            }
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </Box>
    );
}

export default Index;
