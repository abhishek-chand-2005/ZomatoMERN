import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import '../../styles/create-food.css'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!videoFile) return
    const url = URL.createObjectURL(videoFile)
    setVideoUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [videoFile])

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f && f.type.startsWith('video/')) {
      setVideoFile(f)
      setErrors((s) => ({ ...s, video: null }))
    } else {
      setVideoFile(null)
      setVideoUrl(null)
      setErrors((s) => ({ ...s, video: 'Please select a video file.' }))
    }
  }

  const validate = () => {
    const e = {}
    if (!videoFile) e.video = 'Video is required.'
    if (!name.trim()) e.name = 'Name is required.'
    if (!description.trim()) e.description = 'Description is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async(ev) => {
    ev.preventDefault()
    if (!validate()) return

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('name', name);
    formData.append('description', description);

    const response = await axios.post('http://localhost:3000/api/food', formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        console.log('Food created successfully:', response.data);
      }).catch(error => {
        console.error('Error creating food:', error);
      });

      navigate("/");

    // TODO: wire up to backend service. For now just log the payload.
    // console.log('Submitting food:', { name, description, videoFile })
    // alert('Food submitted (demo) — check console for payload')


    // Reset form
    setName('')
    setDescription('')
    setVideoFile(null)
    setVideoUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <h2 className="create-food-title">Create Food</h2>

        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <label className="field-label">Video</label>
            <div className="video-input-wrapper">
              <input
                ref={fileInputRef}
                className="file-input"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="btn-outline file-trigger"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                {videoFile ? 'Change Video' : 'Choose Video'}
              </button>
              {errors.video && <div className="field-error">{errors.video}</div>}
            </div>
          </div>

          {videoUrl && (
            <div className="video-preview">
              <video src={videoUrl} controls playsInline className="video-element" />
            </div>
          )}

          <div className="field-row">
            <label className="field-label">Name</label>
            <input
              className="field-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chicken Biryani"
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="field-row">
            <label className="field-label">Description</label>
            <textarea
              className="field-input"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the dish"
              maxLength={500}
            />
            <div className="field-note">{description.length}/500</div>
            {errors.description && <div className="field-error">{errors.description}</div>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Create</button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setName('')
                setDescription('')
                setVideoFile(null)
                setVideoUrl(null)
                if (fileInputRef.current) fileInputRef.current.value = null
                setErrors({})
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood