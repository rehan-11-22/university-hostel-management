import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Spinner
} from "reactstrap";
import { BASE_URL } from "services/Helper";
import axios from "axios";
import { MDBDataTable } from "mdbreact";




const Index = () => {
  const [allStudents, setAllStudents] = useState([])


  const [hostelList, setHostelList] = useState([])
  const [hostelName, setHostelName] = useState("")
  const [messTime, setMessTime] = useState("")
  const [attendanceData, setAttendanceData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // const showAlert = useAlert()

  const data = {

    columns: [
      {
        label: "Roll Number",
        field: "rollNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "fullname",
        sort: "asc",
        width: 270,
      },
      {
        label: "Attendance",
        field: "attendance",
        sort: "asc",
        width: 200,
      },

    ],
    // rows: stdData,
    rows: allStudents.map(std => ({
      ...std,
      attendance: (
        <div className="flex-center">
          <FormGroup check inline>
            <Label check>
              <Input
                type="radio"
                name={`attendance-${std._id}`}
                value="Present"
                checked={
                  attendanceData.find((item) => item.studentId === std._id)?.status ===
                  "Present"
                }
                onChange={() => handleRadioButtonChange(std?._id, 'Present')}
              />{" "}
              Present
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input
                type="radio"
                name={`attendance-${std._id}`}
                value="Absent"
                checked={
                  attendanceData.find((item) => item.studentId === std._id)?.status ===
                  "Absent"
                }
                onChange={() => handleRadioButtonChange(std?._id, 'Absent')}

              />{" "}
              Absent
            </Label>
          </FormGroup>
        </div>
      )
    })),

  };



  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/hostel/hostelData`)
      .then((res) => {
        console.log("res ", res?.data?.hostelData);
        setHostelList(res?.data?.hostelData)
      })
      .catch((err) => {
        console.log("Error at getting students records ", err);
      })

  }, [])
  const handleRadioButtonChange = (studentId, status) => {
    const updatedAttendanceData = attendanceData.map((item) => {
      if (item.studentId === studentId) {
        return { ...item, status };
      }
      return item;
    });

    if (!updatedAttendanceData.some((item) => item.studentId === studentId)) {
      updatedAttendanceData.push({ studentId, status });
    }

    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)
    axios.get(`${BASE_URL}/api/v1/users/student/hostelName/${hostelName}`)
      .then((res) => {
        console.log("res ", res?.data?.allStdData);
        setAllStudents(res?.data?.allStdData)
        const initialAttendanceData = res?.data?.allStdData.map(student => ({
          studentId: student._id,
          status: 'Absent'
        }));
        setAttendanceData(initialAttendanceData);


      })
      .catch((err) => {
        console.log("Error at getting students records ", err);
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }


  const handleSubmitAttendance = (e) => {
    setIsSubmitting(true)
    e.preventDefault();
    axios.post(`${BASE_URL}/api/v1/attendance/create`, { messTime, hostelName, attendanceData })
      .then((res) => {
        console.log(res);
        window.notify(res?.data?.message, "success")
      })
      .catch((err) => {
        console.log("error at submit attendance ", err.response.data.message);
        window.notify(err?.response?.data?.message, "error")
      })
      .finally(() => {
        setIsSubmitting(false)
      })

  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="mt-2">
      <Container fluid>
        <Row>
          <Col xs="12">


            <h3 className="card-title text-center mb-4 fs-3 fw-bold">
              Students Mess Attendence
            </h3>
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="hostalname">
                      Hostal Name
                    </Label>
                    <Input
                      type="select"
                      name="hostalname"
                      id="hostalname"
                      onChange={(e) => setHostelName(e.target.value)}
                      required
                    >
                      <option value="">Select hostal</option>
                      {hostelList.map((hostel, key) => {
                        return <option key={key} value={hostel?.name}>{hostel?.name}</option>

                      })

                      }
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="messtime">
                      Mess Time
                    </Label>
                    <Input
                      type="select"
                      name="messtime"
                      id="messtime"
                      onChange={(e) => setMessTime(e.target.value)}
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="dinner">Dinner</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="my-2" >
                <Col>
                  <Button color="primary" type="submit">
                    {!isProcessing
                      ? "Fetch Data"
                      : <><Spinner size="sm">Loading...</Spinner><span>{' '}Loading</span></>
                    }
                  </Button>
                </Col>
              </Row>
            </Form>

            <Card>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <MDBDataTable responsive bordered data={data} noBottomColumns />
                    {/* <Table responsive striped>
                      <thead>
                        <tr>
                          <th>
                            Roll No.
                          </th>
                          <th>
                            Student Name
                          </th>
                          <th>
                            Attendence
                          </th>

                        </tr>
                      </thead>
                      <tbody>
                        {allStudents.map((student, key) => {
                          return <tr key={key}>
                            <th scope="row">
                              {student?.rollNumber ? student?.rollNumber : "0000"}
                            </th>
                            <td>
                              {student?.fullname}
                            </td>
                            <td>
                              <FormGroup check inline>
                                <Label check>
                                  <Input
                                    type="radio"
                                    name={`attendance-${student._id}`}
                                    value="Present"
                                    onChange={() => handleRadioButtonChange(student?._id, 'Present')}
                                  />{" "}
                                  Present
                                </Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Label check>
                                  <Input
                                    type="radio"
                                    name={`attendance-${student._id}`}
                                    value="Absent"
                                    checked
                                    onChange={() => handleRadioButtonChange(student?._id, 'Absent')}

                                  />{" "}
                                  Absent
                                </Label>
                              </FormGroup>
                            </td>
                          </tr>
                        })
                        }
                      </tbody>
                    </Table> */}
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col>
                    <Button color="primary" onClick={handleSubmitAttendance}>
                      {!isSubmitting
                        ? "Submit attendance"
                        : <><Spinner size="sm">Loading...</Spinner><span>{' '}Loading</span></>
                      }
                    </Button>
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
