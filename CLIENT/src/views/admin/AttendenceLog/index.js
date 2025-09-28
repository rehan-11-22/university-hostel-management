import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Box } from "@chakra-ui/react";

const attendanceData = [
  {
    id: 1,
    courseId: "CSI-619",
    subjectTitle: "Information Security 3(3-0)",
    teacherName: "Shahbaz sahb",
    lectures: 54,
    present: 54,
    leave: 0,
    absent: 0,
    percentage: "50%",
  },
  {
    id: 2,
    courseId: "GEO-510",
    subjectTitle: "Geographic Information System ",
    teacherName: "Mam maryam",
    lectures: 54,
    present: 50,
    leave: 0,
    absent: 4,
    percentage: "93%",
  },
  {
    id: 3,
    courseId: "CIT-639",
    subjectTitle: "Routing And Switching ",
    teacherName: "Tahir Abudlla",
    lectures: 50,
    present: 46,
    leave: 0,
    absent: 4,
    percentage: "92%",
  },
  {
    id: 4,
    courseId: "CIT-652",
    subjectTitle: "Data Mining ",
    teacherName: "Dr.Afzaal   ",
    lectures: 48,
    present: 44,
    leave: 0,
    absent: 4,
    percentage: "92%",
  },
  {
    id: 5,
    courseId: "CIT-502",
    subjectTitle: "Information Technology Infrastructure ",
    teacherName: "Sumaira Akram",
    lectures: 52,
    present: 52,
    leave: 0,
    absent: 0,
    percentage: "60%",
  },
];

const Index = () => {
  return (
    <Box
      p={{ base: "30px", md: "80px", xl: "30px" }}
      className="rounded bg-white"
      style={{ marginTop: "80px", overflow: "hidden" }}
    >
       <Container fluid>
        <Row>

          <Col className="">
            <h4 className="text-center mt-4 mb-4 bg-info py-1 fw-bold">Attendence Details of Muhammad Tahir Siddique</h4>
          </Col>
        </Row>
      </Container>
      <Container style={{ padding: "5px" }}>
        <Row>
          <Col>
            <Table responsive bordered style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Course ID</th>
                  <th>Subject Title</th>
                  <th>Teacher Name</th>
                  <th>Lectures</th>
                  <th>Present</th>
                  <th>Leave</th>
                  <th>Absent</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.courseId}</td>
                      <td>{item.subjectTitle}</td>
                      <td>{item.teacherName}</td>
                      <td>{item.lectures}</td>
                      <td>{item.present}</td>
                      <td>{item.leave}</td>
                      <td>{item.absent}</td>
                      <td style={{ textAlign: "center" }}>
                        <button style={{ border: "none", background: "none" }}>
                          {/* <img src="view_icon.png" alt="View" /> */} view
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="9">
                        <div
                          style={{
                            width: item.percentage,
                            backgroundColor: "#4caf50",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          {item.percentage}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default Index;
