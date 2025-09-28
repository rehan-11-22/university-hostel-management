import React from "react";
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
// import PieChart from "components/charts/PieChart";
import { VSeparator } from "components/separator/Separator";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  Tooltip, Legend, ArcElement, CategoryScale, LinearScale
);

export default function Conversion(props) {
  const { totalRooms, totalAvailableRooms } = props.data;

  const perAvailableRooms = (totalAvailableRooms * 100) / totalRooms;
  const perBookedRooms = 100 - perAvailableRooms;

  const data = {
    labels: ['Booked Rooms', 'Available Rooms'],
    datasets: [
      {
        data: [perBookedRooms, perAvailableRooms],
        backgroundColor: ['green', '#17a2b8'], // green for booked, info color (bootstrap info)
        hoverBackgroundColor: ['green', '#17a2b8'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          }
        }
      }
    }

  };

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");

  return (
    <div className="card flex-center border-0 rounded-4 p-1" p='10px' align='center'  direction='column' w='100%'>
      {/* <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Room State
        </Text>
        <Select
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          <option value='daily'>Daily</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </Select>
      </Flex> */}
      <div style={{ width: '300px', height: '300px' }}>
        <Pie
          h='100%'
          w='100%'
          data={data}
          options={options} />
      </div>

      <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='20px'
        mt='15px'
        mx='auto'>
        <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='green' borderRadius='50%' me='4px' />
            <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
              Booked
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            {perBookedRooms.toFixed(0) + "%"}
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
        <Flex direction='column' py='5px' me='10px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#17a2b8' borderRadius='50%' me='4px' />
            <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
              Available
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            {perAvailableRooms.toFixed(0) + "%"}
          </Text>
        </Flex>
      </Card>
    </div>
  );
}
