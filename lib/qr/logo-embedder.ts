// Client-side logo embedding utility
// This runs in the browser to embed logos into QR codes

export async function embedLogoInQR(
  qrDataUrl: string,
  logoUrl: string,
  logoSize?: number,
  logoMargin?: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const qrImg = new Image()
    qrImg.crossOrigin = 'anonymous'
    
    qrImg.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = qrImg.width
      canvas.height = qrImg.height
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }
      
      // Draw QR code
      ctx.drawImage(qrImg, 0, 0)
      
      // Calculate logo size (15% of QR code width, max 60px)
      const calculatedLogoSize = logoSize || Math.min(qrImg.width * 0.15, 60)
      const margin = logoMargin || 2
      const logoX = (canvas.width - calculatedLogoSize) / 2
      const logoY = (canvas.height - calculatedLogoSize) / 2
      
      // Draw white background for logo
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(
        logoX - margin,
        logoY - margin,
        calculatedLogoSize + margin * 2,
        calculatedLogoSize + margin * 2
      )
      
      // Load and draw logo
      const logoImg = new Image()
      logoImg.crossOrigin = 'anonymous'
      
      logoImg.onload = () => {
        // Draw logo centered
        ctx.drawImage(logoImg, logoX, logoY, calculatedLogoSize, calculatedLogoSize)
        resolve(canvas.toDataURL())
      }
      
      logoImg.onerror = () => {
        // If logo fails to load, return QR code without logo
        console.warn('Failed to load logo, returning QR code without logo')
        resolve(qrDataUrl)
      }
      
      logoImg.src = logoUrl
    }
    
    qrImg.onerror = () => {
      reject(new Error('Failed to load QR code image'))
    }
    
    qrImg.src = qrDataUrl
  })
}

