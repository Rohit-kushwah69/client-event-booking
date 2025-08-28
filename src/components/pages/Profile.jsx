import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || '', email: user.email || '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:8000/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Profile update failed');

      setUser(data);
      setSuccessMsg('✅ Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Col md={8} lg={7}>
        <Card className="p-5 shadow-lg rounded-4 border-0 bg-light">
          <div className="text-center mb-4">
            <FaUserCircle size={60} className="text-primary mb-2" />
            <h3 className="fw-bold mb-0">Manage Your Profile</h3>
            <p className="text-muted">Update your personal details below</p>
          </div>

          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Form onSubmit={handleUpdateProfile}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid mt-3">
              <Button variant="primary" type="submit" disabled={loading} size="lg" className="fw-semibold">
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    &nbsp; Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Container>
  );
}

export default Profile;
