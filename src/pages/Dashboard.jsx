import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { UserOutlined, TeamOutlined, IdcardOutlined } from '@ant-design/icons';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

const DashboardContent = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalLecturers, setTotalLecturers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getDocs(collection(db, 'users'));
                const studentsData = await getDocs(collection(db, 'Mahasiswa'));
                const lecturersData = await getDocs(collection(db, 'Dosen'));

                setTotalUsers(usersData.size);
                setTotalStudents(studentsData.size);
                setTotalLecturers(lecturersData.size);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <Row gutter={[16, 16]} className="mb-4">
                <Col span={24}>
                    <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Card className="bg-blue-200">
                        <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                        <p className="text-3xl font-bold">
                            <UserOutlined style={{ marginRight: '8px' }} />
                            {totalUsers}
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card className="bg-green-200">
                        <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                        <p className="text-3xl font-bold">
                            <TeamOutlined style={{ marginRight: '8px' }} />
                            {totalStudents}
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card className="bg-yellow-200">
                        <h3 className="text-lg font-semibold mb-2">Total Lecturers</h3>
                        <p className="text-3xl font-bold">
                            <IdcardOutlined style={{ marginRight: '8px' }} />
                            {totalLecturers}
                        </p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardContent;
