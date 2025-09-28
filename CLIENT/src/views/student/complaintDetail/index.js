import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Spinner } from "reactstrap";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "services/Helper";
import { useAuth } from "contexts/AuthContext";

const Index = () => {
  const [userComplaints, setUserComplaints] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuth()


  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/users/student/complaint`)
      .then(res => {
        const allComplaints = res?.data?.allComplaintData
        const filtered = allComplaints.filter(complaint => complaint.email === user?.email);
        setUserComplaints(filtered)
        // (response.data.allComplaintData);
      })
      .catch(error => {
        console.error('error in complaint data:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])


  console.log("User complaints ", userComplaints);

  return (

    <Box p={{ base: "130px", md: "80px", xl: "80px" }}>
      <Container fluid>
        <Row>

          <Col className="">
            <h4 className="text-center mt-4 mb-4 bg-white py-1 fw-bold">Complaint will be solve in two to three working days</h4>
          </Col>
        </Row>
      </Container>

      <Container responsive>
        {isLoading
          ? <div className="flex-center"><Spinner></Spinner></div>
          : <Row>
            <Col>
              {userComplaints.length !== 0
                ? <Table responsive striped>
                  <thead>
                    <tr>
                      <th>
                        #
                      </th>

                      <th>
                        Complaint Type
                      </th>
                      <th>
                        Description
                      </th>
                      <th>
                        Complaint Status
                      </th>


                    </tr>
                  </thead>
                  <tbody>
                    {userComplaints.map((complaint,index) => {
                      return <tr key={complaint._id}>
                        <th scope="row">
                          {index + 1}
                        </th>

                        <td>
                          {complaint?.complaintType}
                        </td>
                        <td>
                          {complaint?.description}
                        </td>
                        <td>
                          <button className={`btn btn-${complaint?.status[complaint?.status.length - 1] === "pending" ? "primary" : complaint?.status[complaint?.status.length - 1] === "processing" ? "info" : "success"} btn-sm shdow-lg rounded-5 px-2`}>{complaint?.status[complaint?.status.length - 1]}</button>
                        </td>
                      </tr>
                    })
                    }


                  </tbody>
                </Table>
                : <p className="text-center">There is No Complaint Yet</p>

              }

            </Col>
          </Row>
        }
      </Container>
    </Box>
  );
}

export default Index;
