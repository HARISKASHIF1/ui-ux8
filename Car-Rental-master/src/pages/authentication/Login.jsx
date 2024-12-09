import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Row, Col, Button, Container } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await logIn(email, password);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await googleSignIn();
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Container className='mt-3'>
                <Row>
                    {isLoading && (
                        <Container className="text-center">
                            <div class="loading-element">
                                <img src="../assets/loading.svg" alt="" />
                            </div>
                        </Container>
                    )}
                    {!isLoading && <Col className="mt-4"
                        md={{
                            size: 6,
                        }}>
                        <h2 className="mb-3">Firebase Auth Login</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="Submit">
                                    Log In
                                </Button>
                            </div>
                        </Form>
                        <hr />
                        <div>
                            <GoogleButton
                                className="g-btn"
                                type="light"
                                onClick={handleGoogleSignIn}
                            />
                        </div>
                        <div className="p-4 box mt-3 text-center">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </div>
                    </Col>}
                </Row>
            </Container>
        </>
    );
};