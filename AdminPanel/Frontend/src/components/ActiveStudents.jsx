import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../utils/utils'

const ActiveStudents = () => {
   const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`${BACKEND_URL}/api/active-students`)
                .then(res => res.json())
                .then(data => setCount(data.count))
                .catch(err => console.error("Error fetching count:", err.message));
        }, 3000); // refresh every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return <h2>Active Students: {count}</h2>;
}

export default ActiveStudents