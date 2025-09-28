import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdLock,
  MdAppRegistration,
  MdCurrencyExchange,
  MdHistory,
  MdEventAvailable,
  MdListAlt,
  MdReport,
  MdGroups2,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import RegisterStaff from "views/admin/staff";
import ComplaintSeen from './views/admin/complaints'
// import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import StudentRecord from "views/admin/std/StudentRecord";
// import RTL from "views/admin/rtl";
import RegNewUser from './views/admin/std/RegNewStudent'
import AttendenceLog from './views/admin/AttendenceLog'
import HostelDataList from './views/admin/hostelList/HostelDetailsList'
import EmployeeLoginHisoty from "views/admin/staff/LoginHistory";
import EmployeeList from "views/admin/staff/ListOfEmployee";
import GenFeeVoucher from "views/admin/fee/genFeeVoucher";


// suprident routes
import RegisterHostel from './views/suprident/hostel/registerHostel'
import FeeGenerationForm from "views/suprident/fee/feeGenerationForm";
import MessAtendence from "./views/suprident/attendence"
import FeeList from './views/suprident/fee/feeList'
import SComplaint from './views/suprident/complaint'

// Clark routes
import DefaultCom from './views/clark/default'


// Auth Imports
import SignInCentered from "views/auth/signIn";

// students routes
import Complaint from './views/student/complaint'
import SProfile from './views/student/profile'
import Complaintdetails from './views/student/complaintDetail'
import { IoMdListBox } from "react-icons/io";
import { FaToiletPaper, FaUserCheck } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { IoCreate } from "react-icons/io5";
import { RiFileList3Fill } from "react-icons/ri";
import { StdFeeList } from "views/admin/std/StdFeeList";
import { StdFeeRecord } from "views/admin/std/StdFeeRecord";



const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={AiFillDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
    roles: ["admin"],
  },
  {
    name: "Employee Log",
    layout: "/admin",
    path: "/history",
    icon: <Icon as={MdHistory} width='20px' height='20px' color='inherit' />,
    component: EmployeeLoginHisoty,
    roles: ["admin"],
  },
  {
    name: "New Employee",
    layout: "/admin",
    path: "/register",
    icon: <Icon as={MdAppRegistration} width='20px' height='20px' color='inherit' />,
    component: RegisterStaff,
    roles: ["admin"],
  },
  {
    name: "Employee List",
    layout: "/admin",
    path: "/employee-list",
    icon: <Icon as={IoMdListBox} width='20px' height='20px' color='inherit' />,
    component: EmployeeList,
    roles: ["admin"],
  },
  {
    name: "Hostels Availabiliy",
    layout: "/admin",
    icon: <Icon as={MdEventAvailable} width='20px' height='20px' color='inherit' />,
    path: "/hosteldetails",
    component: HostelDataList,
    roles: ["admin"],
  },
  {
    name: "Fee Genration",
    layout: "/admin",
    icon: <Icon as={FaToiletPaper} width='20px' height='20px' color='inherit' />,
    path: "/feegenration",
    component: FeeGenerationForm,
    roles: ["admin"],
  },
  {
    name: "Fee List",
    layout: "/admin",
    icon: <Icon as={MdListAlt} width='20px' height='20px' color='inherit' />,
    path: "/feelist",
    component: FeeList,
    roles: ["admin"],
  },
  {
    name: "Student Fee Record",
    layout: "/admin",
    icon: <Icon as={MdListAlt} width='20px' height='20px' color='inherit' />,
    path: "/feerecord",
    component: StdFeeRecord,
    roles: ["admin"],
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  //   roles: ["admin"],

  // },
  // {
  //   name: "Students",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  //   roles: ["admin"],
  // },
  {
    name: "Students",
    layout: "/admin",
    icon: <Icon as={MdGroups2} width='20px' height='20px' color='inherit' />,
    path: "/StudentRecord",
    component: StudentRecord,
    roles: ["admin"],
  },
  {
    name: "Complaints",
    layout: "/admin",
    path: "/complaints",
    icon: <Icon as={MdReport} width='20px' height='20px' color='inherit' />,
    component: ComplaintSeen,
    roles: ["admin"],
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
    roles: ["admin"],
  },

  // Suprident Routes starts here
  {
    name: "Register Student",
    layout: "/suprident",
    path: "/default",
    icon: <Icon as={IoCreate} width='20px' height='20px' color='inherit' />,
    component: RegNewUser,
    roles: ["suprident"],
  },
  {
    name: "Register Hostel",
    layout: "/suprident",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/newhostel",
    component: RegisterHostel,
    roles: ["suprident"],
  },
  {
    name: "Attendence",
    layout: "/suprident",
    icon: <Icon as={FaUserCheck} width='20px' height='20px' color='inherit' />,
    path: "/mess-attendence",
    component: MessAtendence,
    roles: ["suprident"],
  },
  {
    name: "Students",
    layout: "/suprident",
    icon: <Icon as={MdGroups2} width='20px' height='20px' color='inherit' />,
    path: "/studentRecord",
    component: StudentRecord,
    roles: ["suprident"],
  },
  {
    name: "Hostels Availabiliy",
    layout: "/suprident",
    icon: <Icon as={MdEventAvailable} width='20px' height='20px' color='inherit' />,
    path: "/hosteldetails",
    component: HostelDataList,
    roles: ["suprident"],
  },
  {
    name: "Gen Fee Voucher",
    layout: "/suprident",
    path: "/feemodel",
    icon: <Icon as={MdCurrencyExchange} width='20px' height='20px' color='inherit' />,
    component: GenFeeVoucher,
    roles: ["suprident"],
  },
  {
    name: "Student Fee List",
    layout: "/suprident",
    path: "/feelist",
    icon: <Icon as={MdCurrencyExchange} width='20px' height='20px' color='inherit' />,
    component: StdFeeList,
    roles: ["suprident"],
  },

  {
    name: "Complaints",
    layout: "/suprident",
    icon: <Icon as={MdReport} width='20px' height='20px' color='inherit' />,
    path: "/complaints",
    component: SComplaint,
    roles: ["suprident"],
  },
  // Clark routes
  {
    name: "Attendence",
    layout: "/clark",
    icon: <Icon as={FaUserCheck} width='20px' height='20px' color='inherit' />,
    path: "/default",
    component: MessAtendence,
    roles: ["clark"],
  },
  {
    name: "Register Hostel",
    layout: "/clark",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/newhostel",
    component: RegisterHostel,
    roles: ["clark"],
  },
  {
    name: "Hostels Availabiliy",
    layout: "/clark",
    icon: <Icon as={MdEventAvailable} width='20px' height='20px' color='inherit' />,
    path: "/hosteldetails",
    component: HostelDataList,
    roles: ["clark"],
  },
  {
    name: "Students",
    layout: "/clark",
    icon: <Icon as={MdGroups2} width='20px' height='20px' color='inherit' />,
    path: "/studentRecord",
    component: StudentRecord,
    roles: ["clark"],
  },
  {
    name: "Test",
    layout: "/clark",
    icon: <Icon as={MdReport} width='20px' height='20px' color='inherit' />,
    path: "/test",
    component: DefaultCom,
    roles: ["clark"],
  },

  // Students routes
  {
    name: "Profile",
    layout: "/student",
    path: "/default",
    icon: <Icon as={MdGroups2} width='20px' height='20px' color='inherit' />,
    component: SProfile,
    roles: ["student"],
  },

  // {
  //   name: "Attendence",
  //   layout: "/student",
  //   path: "/attendanceDetails",
  //   icon: <Icon as={FaUserCheck} width='20px' height='20px' color='inherit' />,
  //   component: AttendenceLog,
  //   roles: ["student"],
  // },
  {
    name: "Complaint",
    layout: "/student",
    path: "/complaint",
    icon: <Icon as={MdReport} width='20px' height='20px' color='inherit' />,
    component: Complaint,
    roles: ["student"],
  },
  {
    name: "Complaint Status",
    layout: "/student",
    path: "/complaintDetails",
    icon: <Icon as={RiFileList3Fill} width='20px' height='20px' color='inherit' />,
    component: Complaintdetails,
    roles: ["student"],
  },
 

  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
    roles: ["admin", "suprident", "student"],
  },

];

export default routes;
