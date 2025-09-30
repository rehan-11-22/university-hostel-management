// Chakra imports
import {
  Box,
  Icon,
  SimpleGrid,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// import Usa from "assets/img/dashboards/usa.png";
import axios from "axios";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAppRegistration,
  // MdAttachMoney,
  MdBarChart,
  MdGppGood,
  // MdNotificationImportant,
} from "react-icons/md";
// import CheckTable from "views/admin/default/components/CheckTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
// import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
// import Tasks from "views/admin/default/components/Tasks";
// import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
// import {
//   columnsDataCheck,
//   columnsDataComplex,
// } from "views/admin/default/variables/columnsData";
// import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
// import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import ApiRequest from "api/dashboardApi/api";
// base url for server
import { BASE_URL } from "services/Helper.js";
import { CirclesWithBar } from "react-loader-spinner";

export default function UserReports() {
  const [stdData, setStdData] = useState(0);
  const [empData, setEmpData] = useState(0);
  const [totalHostel, setTotalHostel] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalAvailableRooms, setTotalAvailableRooms] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalComplaints, setTotalComplaints] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [successComplaints, setSuccessComplaints] = useState([]);
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const getComplaintsData = async () => {
    try {
      axios
        .get(`${BASE_URL}/api/v1/users/student/complaint`)
        .then((response) => {
          console.log("total complaints ", response.data.allComplaintData);
          const allcomplaints = response.data.allComplaintData;
          setTotalComplaints(allcomplaints);
          const filteredComplaints = allcomplaints.filter((complaint) => {
            return (
              complaint.status.includes("pending") ||
              complaint.status.includes("processing")
            );
          });
          const successComplaints = allcomplaints.filter((complaint) => {
            return complaint.status.includes("success");
          });
          setPendingComplaints(filteredComplaints);
          setSuccessComplaints(successComplaints);
        });
    } catch (err) {
      console.log(err.message || "Error fetching complaints || dashboard data");
      // setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    getComplaintsData();
    try {
      const response = await ApiRequest(
        `${BASE_URL}/api/v1/users/staff`,
        "GET"
      );
      // console.log("this is response form emp list ", response.allEmpData);
      setEmpData(response.allEmpData.length);
      // setLoading(false);
    } catch (err) {
      console.log(err.message || "Error fetching emp || dashboard data");
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    axios
      .get(`${BASE_URL}/api/v1/users/student`)
      .then((res) => {
        const studentData = res?.data?.allStdData;
        // console.log( studentData.length);
        setStdData(studentData.length);
        // setStdData(studentData);
        // console.log("All students ", res.data.allStdData);
        // stdData.push(studentData)
        // console.log("student data ",stdData);
      })
      .catch((error) => {
        console.log("Error at getting data of students  ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/hostel`)
      .then((res) => {
        // console.log(res);
        setTotalHostel(res?.data?.totalHostels);
        setTotalRooms(res?.data?.totalRooms);
        setTotalAvailableRooms(res?.data?.availableRooms);
      })
      .catch((error) => {
        console.log("Error at getting hostel state data ", error);
      });
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // 100% viewport height
          }}
        >
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Hostels"
              value={totalHostel}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Rooms"
              value={totalRooms}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Booked Rooms"
              value={totalRooms - totalAvailableRooms}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Available Rooms"
              value={totalAvailableRooms}
            />
          </SimpleGrid>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Employee"
              value={empData ? empData : 0}
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Students"
              value={isLoading ? <Spinner>Loading...</Spinner> : stdData}
            />
            {/* <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Expense"
              value="$350.4"
            /> */}

            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Complaints"
              value={totalComplaints.length}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAppRegistration}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Pending Complaints"
              value={pendingComplaints.length}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={MdGppGood} color={brandColor} />
                  }
                />
              }
              name="Solved Complaints"
              value={successComplaints.length}
            />
            {/* <MiniStatistics growth="+23%" name="Diffrences" value="$574.34" /> */}
            {/* <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
            <FormLabel htmlFor="balance">
            <Avatar src={Usa} />
            </FormLabel>
            <Select
                id="balance"
                variant="mini"
                mt="5px"
                me="0px"
                defaultValue="usd"
                >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gba">GBA</option>
                </Select>
                </Flex>
              }
              name="Total Number of Hostels"
          value="3"
          />
          <MiniStatistics
          startContent={
            <IconBox
            w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
              />
            }
            name="Current Month Expenses"
            value="154"
            />
            <MiniStatistics
            startContent={
              <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Remainin Balance"
          value="2935"
        /> */}
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 2 }}
            gap="20px"
            mb="20px"
            className="p-0"
          >
            <PieCard data={{ totalRooms, totalAvailableRooms }} />
            <WeeklyRevenue />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
            {/* <CheckTable
              columnsData={columnsDataCheck}
              tableData={tableDataCheck}
            /> */}
            <MiniCalendar h="100%" minW="100%" selectRange={false} />
            {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px"> */}
            {/* <DailyTraffic /> */}
            {/* <PieCard data={{ totalRooms, totalAvailableRooms }} /> */}
            {/* </SimpleGrid> */}
          </SimpleGrid>
          {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px"> */}
          {/* <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
            /> */}
          {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px"> */}
          {/* <Tasks /> */}
          {/* <MiniCalendar h="100%" minW="100%" selectRange={false} /> */}
          {/* </SimpleGrid> */}
          {/* </SimpleGrid> */}
        </>
      )}
    </Box>
  );
}
