import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("allusers")) || [];
        const user = users[id];
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setMobile(user.mobile || '');
            setSalary(user.salary || '');
        }
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("allusers")) || [];
        users[id] = { ...users[id], name, email, mobile, salary };
        localStorage.setItem("allusers", JSON.stringify(users));
        alert("User updated successfully");
        navigate("/dashboard/users");
    }

    return (
        <div className="container">
            <h2>Update User</h2>
            <form onSubmit={submitHandler} className="bg-light p-4 rounded">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input type="number" value={salary} onChange={e => setSalary(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update User</button>
            </form>
        </div>
    );
}

