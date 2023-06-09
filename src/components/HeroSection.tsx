import {
    Box,
    Typography,
    Button,
    Snackbar,
    Alert,
    TextField,
    Card,
    CardContent,
} from '@mui/material'
import UploadResume from './UploadResume'
import React, { useState } from 'react'
import { TemporaryResume } from '../api/types'
import { LoadingButton } from '@mui/lab'
import { generateCoverLetterPublic } from '../api/resume_service'

const HeroSection: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resume, setResume] = useState<TemporaryResume | null>(null)
    const [jobDescription, setJobDescription] = useState('')
    const [generatedCoverLetter, setGeneratedCoverLetter] = useState('')

    const handleSubmit = async () => {
        setLoading(true)
        const response = await generateCoverLetterPublic({
            resume_id: resume!!.id,
            job_desc: jobDescription,
        })

        if (response.state === 'SUCCESS') {
            setGeneratedCoverLetter(response.data.cover_letter)
        } else {
            console.error('Error generating cover letter:', response.error)
            setError(error)
        }
        setLoading(false)
    }

    const handleCloseSnackbar = () => {
        setError(null)
    }

    const handleUploadSuccess = (uploadedResume: TemporaryResume) => {
        setResume(uploadedResume)
    }

    const handleOpenUploadDialog = () => {
        setUploadDialogOpen(true)
    }

    const handleCloseUploadDialog = () => {
        setUploadDialogOpen(false)
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
            padding={4}
        >
            <Typography variant="h2" gutterBottom>
                Welcome to InterviewGrab.tech - Your AI-powered Job Search
                Assistant
            </Typography>
            <Typography variant="h5" gutterBottom>
                Discover the perfect job opportunities with our AI-driven job
                search engine. Seamlessly apply with our Chrome extension, which
                autofills your information on career pages. Create personalized
                cover letters and manage your resumes effortlessly.
            </Typography>
            <label htmlFor="upload-file">
                <Button variant="outlined" color="primary" component="span" onClick={handleOpenUploadDialog}>
                    {resume ? resume.file_name : 'Upload Resume'}
                </Button>
            </label>
            <UploadResume
                open={uploadDialogOpen}
                onClose={handleCloseUploadDialog}
                onUploadSuccess={handleUploadSuccess}
                setError={setError} 
                isPublic={true}    
            />
            <TextField
                label="Job Description"
                variant="outlined"
                multiline
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                sx={{ minWidth: 400, mt: 2 }}
            />

            <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
                disabled={resume == null}
                loading={loading}
            >
                Generate
            </LoadingButton>
            {loading && (
                <Typography>
                    Hang on for 1 minute!!, Your cover-letter is being
                    generated.
                </Typography>
            )}
            {generatedCoverLetter && (
                <Box sx={{ mt: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Generated Cover Letter:
                            </Typography>
                            <Box
                                component="pre"
                                sx={{
                                    background: (theme) =>
                                        theme.palette.background.default,
                                    borderRadius: 1,
                                    p: 2,
                                    mt: 2,
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {generatedCoverLetter}
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            )}
            <Snackbar
                open={error !== null}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default HeroSection
