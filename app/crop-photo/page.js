 'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function CropPhotoPage() {
  const [image, setImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [croppedUrl, setCroppedUrl] = useState('');
  const imgRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImage(url);
        imgRef.current = img;
        cropImage(img, aspectRatio);
      };
    }
  };

  const cropImage = (img, ratio) => {
    if (!img) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let targetWidth = img.width;
    let targetHeight = img.height;
    let startX = 0;
    let startY = 0;

    if (ratio === '1:1') {
      const minDim = Math.min(img.width, img.height);
      targetWidth = minDim;
      targetHeight = minDim;
      startX = (img.width - minDim) / 2;
      startY = (img.height - minDim) / 2;
    } else if (ratio === '16:9') {
      if (img.width / img.height > 16 / 9) {
        targetHeight = img.height;
        targetWidth = img.height * (16 / 9);
        startX = (img.width - targetWidth) / 2;
      } else {
        targetWidth = img.width;
        targetHeight = img.width * (9 / 16);
        startY = (img.height - targetHeight) / 2;
      }
    } else if (ratio === '4:5') {
      if (img.width / img.height > 4 / 5) {
        targetHeight = img.height;
        targetWidth = img.height * (4 / 5);
        startX = (img.width - targetWidth) / 2;
      } else {
        targetWidth = img.width;
        targetHeight = img.width * (5 / 4);
        startY = (img.height - targetHeight) / 2;
      }
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(img, startX, startY, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
    setCroppedUrl(canvas.toDataURL('image/jpeg', 0.95));
  };

  const handleRatioChange = (ratio) => {
    setAspectRatio(ratio);
    if (imgRef.current) {
      cropImage(imgRef.current, ratio);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '30px 16px' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto', backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>
        
        <h2 style={{ fontSize: '24px', color: '#1e293b', marginTop: '16px', marginBottom: '8px' }}>Crop Photo</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Crop images quickly for social media.</p>

        <input type="file" accept="image/*" onChange={handleUpload} style={{ marginBottom: '20px', display: 'block', width: '100%' }} />

        {image && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {['1:1', '16:9', '4:5'].map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => handleRatioChange(ratio)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: aspectRatio === ratio ? '#2563eb' : '#f1f5f9',
                    color: aspectRatio === ratio ? '#ffffff' : '#1e293b',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {ratio}
                </button>
              ))}
            </div>

            {croppedUrl && (
              <div>
                <img src={croppedUrl} alt="Cropped" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '6px', marginBottom: '16px' }} />
                <a href={croppedUrl} download="cropped-photo.jpg" style={{ display: 'block', textAlign: 'center', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold' }}>
                  Download Photo
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
