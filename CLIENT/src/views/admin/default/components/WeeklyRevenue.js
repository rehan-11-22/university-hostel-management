// Chakra imports
import {
  Box,
  Flex,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React, { useEffect, useState } from "react";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

import { MdBarChart } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "services/Helper";

export default function WeeklyRevenue(props) {
  const { ...rest } = props;
  const [hoetlList, setHostelList] = useState([])
  const [hostelName, setHostelName] = useState("")
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Present',
        backgroundColor: 'green',
        data: []
      },
      {
        label: 'Absent',
        backgroundColor: 'red',
        data: []
      }
    ]
  });

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/hostel`)
      .then((res) => {
        // console.log(res.data);
        setHostelList(res?.data?.hostelData)
      })
      .catch((error) => {
        console.log("Error at gettin Hostel List", error);
      })
  }, [])

  useEffect(() => {
    if (!hostelName) return;
    axios.get(`${BASE_URL}/api/v1/attendance/${hostelName}`)
      .then((response) => {
        const data = response.data.weeklyAttendance;
        // console.log("data ", data);

        const labels = Object.keys(data);
        const presentData = labels.map(label => data[label].Present);
        const absentData = labels.map(label => data[label].Absent);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Present',
              backgroundColor: 'green',
              data: presentData
            },
            {
              label: 'Absent',
              backgroundColor: 'red',
              data: absentData
            }
          ]
        });
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
      })
  }, [hostelName]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Students'
        },
        beginAtZero: true
      }
    }
  };




  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Weekly Attendance
        </Text>
        {/* <Button
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...rest}>

          <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          
        </Button> */}
        <Select
          id="balance"
          mt="5px"
          me="0px"
          onChange={(e) => setHostelName(e.target.value)}
        >

          <option value="">Select Hostel</option>
          {
            hoetlList.map((hostel, index) => {
              return <option key={index} value={hostel?.name}>{(hostel?.name).toUpperCase()}</option>

            })
          }
        </Select>
      </Flex>

      <Box h='240px' mt='auto'>
        <Bar data={chartData} options={options} />
        {/* <BarChart
          chartData={barChartDataConsumption}
          chartOptions={barChartOptionsConsumption}
        /> */}
      </Box>
    </Card>
  );
}
