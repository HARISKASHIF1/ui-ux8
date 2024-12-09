import { Link, useNavigate } from 'react-router-dom';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import React, { useState } from 'react';

import { useUserAuth } from '../../context/UserAuthContext';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [err, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { signUp } = useUserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, pass);
            navigate("/login")
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div>
            {isLoading && (
                <Container className="text-center">
                    <div class="loading-element">
                        <img src="../assets/loading.svg" alt="" />
                    </div>
                </Container>
            )}
            {!isLoading && <><div className='p-4 box mt-3 text-center'>
                <h2 className='mb-3'>User Sign Up</h2>
                {err && <Alert variant="danger">{err}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Control type='email' placeholder='Email address' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Control type='password' placeholder='Password' onChange={(e) => setPass(e.target.value)} />
                    </Form.Group>
                    <div className='d-grid gap-2'>
                        <Button variant="primary" type="Submit">
                            Sign Up
                        </Button>
                    </div>
                </Form>
            </div><div className='p-4 box mt-3 text-center'>
                    Already have an account?<Link to="/login">Log In</Link>
                </div></>}
        </div>
    );
}