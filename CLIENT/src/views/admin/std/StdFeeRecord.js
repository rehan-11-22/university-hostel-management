import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import axios from 'axios';
import UpdateFeeStatus from 'components/models/updateFeeStatusModel';
import { MDBDataTable } from 'mdbreact';
import { Button, Card, CardBody, CardTitle, Col, Form, Row, Spinner } from 'reactstrap';
import { BASE_URL } from 'services/Helper';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export const StdFeeRecord = () => {
    const [loading, setLoading] = useState(true)
    const [hostelName, setHostelName] = useState("")
    const [stdFeeData, setStdFeeData] = useState([])
    const [hostelData, setHostelData] = useState([])
    const [FeeToUpdate, setFeeToUpdate] = useState([])

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);


    useEffect(() => {
        axios.get(`${BASE_URL}/api/v1/hostel`)
            .then(response => {
                // console.log("Hostel data response =>", response?.data?.hostelData);
                setHostelData(response.data.hostelData);
            })
            .catch(error => {
                console.error('Error fetching hostel data:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [hostelName])

    const handleFatchData = (e) => {
        e.preventDefault()
        axios.get(`${BASE_URL}/api/v1/studentfee/${hostelName}`)
            .then((res) => {
                if (res.status === 200) {
                    // window.notify(res?.data?.message, "success")

                    const feeData = res.data.feeData
                    // console.log("feeData ", feeData);
                    // const filterData = feeData.filter(stdfee => stdfee?.feeStatus === "unpaid")
                    // console.log("filtered data ", filterData);
                    setStdFeeData(feeData)
                }
                if (res.status === 201) {
                    window.notify(res?.data?.message, "error")

                }
                // console.log("response ", res);
            })
            .catch((error) => {
                console.log("error ate fetch data ", error);
            })
    }
    const handleUpdates = async (stdFee) => {
        // console.log("Editing employee with ID:", stdFee);
        // console.log("befor filter :", stdFeeData);

        const studentFee = await stdFeeData.filter(Fee => Fee._id === stdFee)[0];
        setFeeToUpdate(studentFee)
        // console.log("after set update emp data ", studentFee);
        toggleModal()
    };

    // For pdf download
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Student Fee Records', 14, 16);
        doc.autoTable({
            startY: 20,
            head: [['Sr#', 'Student Name', 'Student CNIC', 'Fee Type', 'Total Fee', 'Status']],
            body: stdFeeData.map((stdFee, index) => [
                index + 1,
                stdFee.studentName,
                stdFee.studentcnic,
                stdFee.feeType,
                stdFee.totalAmount,
                stdFee.feeStatus
            ]),
        });
        doc.save('student_fee_records.pdf');
    }


    const data = {

        columns: [
            {
                label: "Sr#",
                field: "sr",
                sort: "asc",
                width: 150,
            },
            {
                label: "Student Name",
                field: "studentName",
                sort: "asc",
                width: 270,
            },
            {
                label: "Student CNIc",
                field: "studentcnic",
                sort: "asc",
                width: 270,
            },
            {
                label: "Fee Type",
                field: "feeType",
                sort: "asc",
                width: 200,
            },
            {
                label: "Total fee",
                field: "totalAmount",
                sort: "asc",
                width: 200,
            },
            {
                label: "Status",
                field: "feeStatus",
                sort: "asc",
                width: 100,
            },
            { label: "Action", field: "action", sort: "disabled", width: 100 },
        ],
        rows: stdFeeData.map((stdFee, index) => ({
            ...stdFee,
            sr: (
                <span className='fw-bold'> {index + 1}</span>
            ),
            action: (
                <div className="flex-center">
                    <Button className="me-1" type="submit" color="danger" size="sm" onClick={() => handleUpdates(stdFee._id)}>
                        update
                    </Button>
                </div>
            )
        })),


    };

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className='mt-2'>
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">
                        <Row>
                            <Col className="col-12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="h4"><span>List of Students </span></CardTitle>
                                        <Form>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="form-group  mb-sm-1">
                                                        <select id="hostel-select" className="form-control" onChange={(e) => setHostelName(e.target.value)}>
                                                            <option value="">Select Hostel</option>
                                                            {/* {hostelData.map((hostel, index) => {
                                                                <option key={index} value={hostel?.name}>{hostel?.name}</option>
                                                            })
                                                            } */}
                                                            {hostelData.map((hostel) => {
                                                                return <option key={hostel._id} value={hostel.name}>{hostel.name}</option>
                                                            }
                                                            )}
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <button className='btn btn-info rounded-0 px-3' onClick={handleFatchData}>Fatch Data</button>
                                                </Col>
                                                <Col md={4} className='d-flex float-end'>
                                                    <button className='btn btn-primary btn-sm rounded-0' onClick={generatePDF}>Download PDF</button>
                                                </Col>

                                            </Row>
                                        </Form>

                                        {!loading
                                            ? <MDBDataTable striped small responsive hover bordered noBottomColumns data={data} noRecordsFoundLabel="No records found || Select hostel" />
                                            : <dir className="d-flex justify-content-center align-items-center" ><Spinner type="border" color="danger" className="p-4">Loading...</Spinner></dir>
                                        }


                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
            <UpdateFeeStatus isOpen={isOpen} toggle={toggleModal} data={FeeToUpdate} />
        </Box>
    )
}
