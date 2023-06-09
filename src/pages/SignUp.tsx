import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material'
import React, { useState } from 'react'
import { signup } from '../api/resume_service'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SignUp: React.FC = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { setToken } = useAuth()
    const navigator = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const response = await signup({ name, email, password })
        if (response.state === 'SUCCESS') {
            const { token } = response.data
            setToken(token)
            if (response.data.emailVerified === true) {
                navigator('/dashboard')
            } else {
                navigator('/email-verification')
            }
        } else {
            setError(response.error)
        }
        setLoading(false)
    }

    return (
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={4}
            onSubmit={handleSubmit}
        >
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            <TextField
                label="Name"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(error)}
            />
            <TextField
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error)}
            />
            <TextField
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(error)}
                helperText={error}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
        </Box>
    )
}

export default SignUp
