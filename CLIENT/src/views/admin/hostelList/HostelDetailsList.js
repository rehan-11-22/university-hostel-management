import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { BASE_URL } from 'services/Helper';

const  HostelDetailsList = ()=> {
    const [hostelData, setHostelData] = useState([]);
    const [selectedHostel, setSelectedHostel] = useState('');
    const [selectedFloor, setSelectedFloor] = useState('');
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

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

        ],
        // rows: rooms,
        rows: rooms.map((room, key) => ({
            ...room,

            availablity: (
                rooms[key].capacity - rooms[key].students.length

            )
        })),

    };


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
                setLoading(false)
            })
    }, []);

    const handleHostelChange = (event) => {
        const hostelName = event.target.value;
        setSelectedHostel(hostelName);
        setSelectedFloor('');
        setRooms([]);
    };

    const handleFloorChange = (event) => {
        const floorNumber = event.target.value;
        console.log("this is floor number  ",typeof(floorNumber));
        setSelectedFloor(floorNumber);
        const selectedHostelObj = hostelData.find(hostel => hostel.name === selectedHostel);
        const  floorData =  selectedHostelObj.floors
        const floorObj = floorData.find(floor => floor.floorNumber === Number(floorNumber));
        console.log("This is floor object ", floorObj);
        if (floorObj) {
            setRooms(floorObj.rooms);
        }
    };



    if (loading) return <Box pt={{ base: "150px", md: "80px", xl: "80px" }}><div>Loading hostels...</div></Box>;
    return (
        <Box pt={{ base: "150px", md: "80px", xl: "80px" }}>

            <Container>
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
            </Container>
        </Box>
    );
}

export default HostelDetailsList;

