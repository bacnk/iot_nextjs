import { useState } from 'react'

export default function BinaryUpload() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload')
      return
    }

    const formData = new FormData()
    formData.append('binary', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    setMessage(data.message)
  }

  return (
    <div>
      <h1>Upload Binary File 111</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <p>{message}</p>
    </div>
  )
}
