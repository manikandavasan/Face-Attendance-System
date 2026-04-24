import { useState, useEffect } from "react"
import "../assets/css/attendance_data.css"
import { useNavigate } from "react-router-dom"


export default function AttendanceData() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/attendance_data/");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <div className="container">
            <h2>Attendance Data</h2>

            {data.length === 0 ? (
                <p>No data found</p>
            ) : (
                <table border="1" className="attendance-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        
    );
}

