import { createReadStream } from 'fs'
import { join } from 'path'
import FormData from 'form-data'
import fetch from 'node-fetch'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { binary } = req.files
    const filePath = join(process.cwd(), 'public', 'binary.bin')

    await new Promise((resolve, reject) => {
      const readStream = createReadStream(binary.path)
      const writeStream = createWriteStream(filePath)

      readStream.on('error', reject)
      writeStream.on('error', reject)
      writeStream.on('finish', resolve)

      readStream.pipe(writeStream)
    })

    const formData = new FormData()
    formData.append('binary', createReadStream(filePath))

    const response = await fetch('http://<ESP32_IP_ADDRESS>/binary', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    })

    if (response.ok) {
      res.status(200).json({ message: 'Binary file upload successful' })
    } else {
      res.status(400).json({ message: 'Binary file upload failed' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
