import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <motion.div
            className="contact-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
        >
            <div className="contact-wrapper">
                <div className="contact-info">
                    <h2>Get In Touch</h2>
                    <p>Have a project in mind? Let's build something amazing together.</p>
                    <div className="info-item">
                        <span>Email:</span> frinpatel1841974@gmail.com
                    </div>
                    <div className="info-item">
                        <span>Phone:</span> +1 (647) 998-0558
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Contact;
