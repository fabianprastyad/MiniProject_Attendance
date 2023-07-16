import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card, Pagination } from "flowbite-react";


const AttendanceReportComponent = () => {
    const token = localStorage.getItem("token");
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    ``,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setAttendanceData(response.data.data);
                setTotalPage(response.data.pagination.totalPages);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage, token]);

    return (
        <div className="flex justify-center items-center bg-slate-100">
            <div
                style={{
                    flexDirection: "column",
                    paddingLeft: "24px",
                    width: "1000px",
                    backgroundColor: "grey",
                    alignItems: "center",
                    display: "flex",
                    height: "auto",
                    minHeight: "94vh",
                }}
            >
                <Card horizontal className="my-10">
                    <div className="flex justify-center">
                        <div>
                            <img className="flex justify-center" src="https://www.wired.com/images_blogs/threatlevel/2009/05/picture-14.png" style={{ width: "120px" }} />
                        </div>
                        <div className="p-8">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {attendanceData.length > 0 && (
                                    <p>{attendanceData[0]?.User.Employee_detail.first_name}</p>
                                )}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {attendanceData.length > 0 && (
                                    <p>
                                        <b>join date: </b>
                                        {attendanceData[0]?.User.Employee_detail.join_date}
                                    </p>
                                )}
                            </p>
                        </div>
                    </div>
                </Card>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>no.</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Clock in</Table.HeadCell>
                        <Table.HeadCell>Clock out</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {attendanceData.map((data, key) => {
                            return (
                                <Table.Row
                                    key={key}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {key + 1}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {data.User.Employee_detail.first_name}
                                    </Table.Cell>
                                    <Table.Cell>{data.clock_in}</Table.Cell>
                                    <Table.Cell>{data.clock_out}</Table.Cell>
                                    <Table.Cell>{data.date}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalPages={totalPage}
                />
            </div>
        </div>
    );
};

export default AttendanceReportComponent;
