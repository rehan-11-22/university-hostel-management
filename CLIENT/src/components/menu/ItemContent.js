import { Icon, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { MdUpgrade } from "react-icons/md";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "services/Helper";
import ComplaintModel from "components/models/complaintModel";
import { useAuth } from "contexts/AuthContext";
export function ItemContent(props) {
  const [complaintData, setComplaintData] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  // const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const { user } = useAuth()

  // const processingComplaint = complaintData.find(item => item.status.includes('processing'));


  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/api/v1/users/student/complaint`)
  //     .then((response) => {
  //       // console.log("response =>", response);
  //       setComplaintData(response.data.allComplaintData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching hostel data:", error);
  //     });
  // }, []);

  const handleComplaintClick = (complaint) => {
    // console.log("Complaint data to send ",complaint);
    setSelectedComplaint(complaint);
    toggleModal()
  };

  // const handleCloseModal = () => {
  //   setSelectedComplaint(null);
  //   setModalOpen(false);
  // };

  const textColor = useColorModeValue("navy.700", "white");

  return (
    <>
      <Flex
        justify="center"
        align="center"
        borderRadius="16px"
        minH={{ base: "60px", md: "70px" }}
        h={{ base: "60px", md: "70px" }}
        minW={{ base: "60px", md: "70px" }}
        w={{ base: "60px", md: "70px" }}
        me="14px"
        bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
      >
        <Icon as={MdUpgrade} color="white" w={8} h={14} />
      </Flex>

      <Flex flexDirection="column">
        {(user?.role === "student" || user?.role === "admin")
          && <>
            {complaintData.map((complaint, index) => (
              <div key={index} onClick={() => handleComplaintClick(complaint)}>
                {console.log("complaint data ", complaint)}
                <Text
                  mb="5px"
                  fontWeight="bold"
                  color={textColor}
                  fontSize={{ base: "md", md: "md" }}
                >
                  Complaint Type: {complaint?.complaintType}
                </Text>
                <Flex alignItems="center">
                  <Text
                    fontSize={{ base: "sm", md: "sm" }}
                    lineHeight="100%"
                    color={textColor}
                  >
                    email
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text
                    fontSize={{ base: "sm", md: "sm" }}
                    lineHeight="100%"
                    color={textColor}
                    className={`py-1 px-2 bg-${complaint?.status[complaint?.status.length - 1] === "pending" ? "primary" : complaint?.status[complaint?.status.length - 1] === "processing" ? "info" : "success"} text-white rounded-pill`}
                  >
                    status
                  </Text>
                </Flex>
              </div>
            ))}

          </>
          // : <p className="text-danger">No complint yet </p>
        }
      </Flex>


      {/* <ComplaintModel isOpen={isOpen} toggle={toggleModal} data={selectedComplaint} /> */}
    </>
  );
}
