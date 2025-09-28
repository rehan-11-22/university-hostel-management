import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, Spinner, Button } from "reactstrap";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "services/Helper";
import { useAlert } from "contexts/AlertContext";

const LoginHistory = () => {
    const [empData, setEmpData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsprocessing] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const showAlert = useAlert()

    useEffect(() => {
        axios.get(`${BASE_URL}/api/v1/users/staff/history`)
            .then((res) => {
                console.log("Login history data ", res?.data?.loginHistory);
                setEmpData(res?.data?.loginHistory);
            })
            .catch((error) => {
                console.log("Error at getting data of Employee  ", error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [isProcessing]);

    const formatLoginTime = (timestamp) => {
        const dateObj = new Date(timestamp);
        return dateObj.toLocaleString();
    };

    const handleSelectAll = () => {
        const newSelectedRows = selectAll ? [] : [...empData];
        setSelectedRows(newSelectedRows);
        setSelectAll(!selectAll);
    };

    const handleRowChecked = (row) => {
        const selectedIndex = selectedRows.indexOf(row);
        let newSelected = [...selectedRows];
        if (selectedIndex === -1) {
            newSelected.push(row);
        } else {
            newSelected.splice(selectedIndex, 1);
        }
        setSelectedRows(newSelected);
    };

    const isSelected = (row) => selectedRows.indexOf(row) !== -1;

    const handleDeleteSelected = () => {
        setIsprocessing(true)
        console.log("Selected Rows to Delete: ", selectedRows);
        if (selectedRows.length === 0) {
            return showAlert("Please select first somthing", "error")
        }
        axios.post(`${BASE_URL}/api/v1/users/staff/history/delete`, selectedRows)
            .then((res) => {
                console.log("res of delete of login history ", res);
                window.notify(`${res?.data?.message}`, "success")
            })
            .catch((err) => {
                console.log("Error at deleting History of user ", err);
                window.notify("Somthing went wrong ", "error")
            })
            .finally(() => {
                setIsprocessing(false)
            })



    };

    const data = {
        columns: [
            {
                label: <input className="form-controler" type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
                field: "checkbox",
                width: 50,
                attributes: {
                    "aria-controls": "DataTable",
                    "aria-label": "Select Row",
                },
                // format: 
            },
            {
                label: "Employee Email",
                field: "empemail",
                sort: "asc",
                width: 150,
            },
            {
                label: "Role",
                field: "emprole",
                sort: "asc",
                width: 150,
            },
            {
                label: "Login Time",
                field: "loginTime",
                sort: "asc",
                width: 270,
            },
            {
                label: "Login Status",
                field: "loginStatus",
                sort: "asc",
                width: 270,
            },
        ],
        rows: empData.map(emp => ({
            ...emp,
            empemail: emp.employeeId.email,
            emprole: emp.employeeId.role,
            loginTime: formatLoginTime(emp.loginTime),
            checkbox: (<input
                className="form-controler"
                type="checkbox"
                checked={isSelected(emp)}
                onChange={() => handleRowChecked(emp)}
            />
            ),
        }))
    };

    document.title = "SIMOY | LoginHistory | Employee";

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <div className="page-content">
                <div className="container-fluid">
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Employee Login History</CardTitle>
                                    <div className="mb-3">
                                        <Button color="danger" disabled={isProcessing} onClick={handleDeleteSelected}>
                                            {!isProcessing
                                                ? "Delete selected"
                                                : <><Spinner size="sm">Loading...</Spinner><span>{' '}Loading</span></>
                                            }
                                        </Button>
                                    </div>
                                    {!loading ? (
                                        <MDBDataTable responsive bordered data={data} />
                                    ) : (
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Spinner type="border" color="danger" className="p-4">Loading...</Spinner>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </Box>
    );
};

export default LoginHistory;
