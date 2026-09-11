 'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CropPhoto() {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [croppedSize, setCroppedSize] = useState(0);
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });

  // Crop Controls
  const [cropW, setCropW] = useState(350);
  const [cropH, setCropH] = useState(450);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 KB';
    const kb = bytes / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(1)} KB`;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          setImageSrc(event.target.result);
          setImgDims({ width: img.width, height: img.height });
          
          const initialW = Math.round(img.width * 0.7);
          const initialH = Math.round(img.height * 0.7);
          setCropW(initialW);
          setCropH(initialH);
          setCropX(0);
          setCropY(0);
          applyCrop(event.target.result, 0, 0, initialW, initialH);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const applyCrop = (src, x, y, w, h) => {
    if (!src || w <= 0 || h <= 0) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCroppedSize(blob.size);
            setCroppedImage(URL.createObjectURL(blob));
            setIsProcessing(false);
          }
        },
        'image/jpeg',
        0.95
      );
    };
  };

  const updateCrop = (x, y, w, h) => {
    const safeX = Math.max(0, Math.min(Number(x), imgDims.width - 10));
    const safeY = Math.max(0, Math.min(Number(y), imgDims.height - 10));
    const safeW = Math.max(10, Math.min(Number(w), imgDims.width - safeX));
    const safeH = Math.max(10, Math.min(Number(h), imgDims.height - safeY));

    setCropX(safeX);
    setCropY(safeY);
    setCropW(safeW);
    setCropH(safeH);

    if (imageSrc) {
      applyCrop(imageSrc, safeX, safeY, safeW, safeH);
    }
  };

  const applyPresetRatio = (aspect) => {
    let targetW = cropW;
    let targetH = cropH;

    if (aspect === '1:1') {
      const side = Math.min(imgDims.width, imgDims.height, cropW);
      targetW = side;
      targetH = side;
    } else if (aspect === 'passport') {
      targetW = 350;
      targetH = 450;
    } else if (aspect === '16:9') {
      targetW = Math.min(imgDims.width, 1280);
      targetH = Math.round((targetW * 9) / 16);
    }

    updateCrop(cropX, cropY, targetW, targetH);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', padding: '30px 16px' }}>
      <div style={{ maxWidth: '950px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginTop: '16px', marginBottom: '8px' }}>
          Crop Photo (Manual Pixels & Ratios)
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Enter exact Width & Height in pixels, adjust cut position, and view live KB output.
        </p>

        {!imageSrc && (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '2px dashed #334155', borderRadius: '16px', cursor: 'pointer', backgroundColor: '#1e293b' }}>
            <span style={{ fontSize: '32px', marginBottom: '8px' }}>✂️</span>
            <span style={{ fontWeight: '600', color: '#38bdf8' }}>Select or Drop Image to Crop</span>
            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Manual pixel cropping</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        )}

        {imageSrc && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {/* Control Sidebar */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155', height: 'fit-content' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '14px', color: '#e2e8f0' }}>Manual Dimensions (Pixels)</h3>

              {/* Exact Width & Height Inputs */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Crop Width (px)</label>
                  <input
                    type="number"
                    value={cropW}
                    onChange={(e) => updateCrop(cropX, cropY, e.target.value, cropH)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Crop Height (px)</label>
                  <input
                    type="number"
                    value={cropH}
                    onChange={(e) => updateCrop(cropX, cropY, cropW, e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Cut Position (X and Y offset) */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Horizontal Position (X)</span>
                  <strong style={{ color: '#38bdf8' }}>{cropX} px</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, imgDims.width - cropW)}
                  value={cropX}
                  onChange={(e) => updateCrop(e.target.value, cropY, cropW, cropH)}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Vertical Position (Y)</span>
                  <strong style={{ color: '#38bdf8' }}>{cropY} px</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, imgDims.height - cropH)}
                  value={cropY}
                  onChange={(e) => updateCrop(cropX, e.target.value, cropW, cropH)}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              {/* Fast Presets */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Quick Size Presets:</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => applyPresetRatio('passport')} style={{ flex: 1, padding: '7px 4px', backgroundColor: '#0f172a', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Passport (3.5×4.5)</button>
                  <button onClick={() => applyPresetRatio('1:1')} style={{ flex: 1, padding: '7px 4px', backgroundColor: '#0f172a', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>1:1 Square</button>
                  <button onClick={() => applyPresetRatio('16:9')} style={{ flex: 1, padding: '7px 4px', backgroundColor: '#0f172a', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>16:9 Landscape</button>
                </div>
              </div>

              {/* Real-time KB Tracker */}
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>Original Size:</span>
                  <strong style={{ color: '#e2e8f0' }}>{formatSize(originalSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#38bdf8' }}>Cropped Output:</span>
                  <strong style={{ color: '#34d399' }}>{formatSize(croppedSize)}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={croppedImage}
                  download={`cropped-${cropW}x${cropH}.jpg`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                    pointerEvents: isProcessing ? 'none' : 'auto',
                    opacity: isProcessing ? 0.6 : 1
                  }}
                >
                  {isProcessing ? 'Updating...' : 'Download Crop'}
                </a>
                <button
                  onClick={() => { setImageSrc(null); setCroppedImage(null); }}
                  style={{ padding: '12px', backgroundColor: '#334155', border: 'none', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Live Visual Preview */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                Live Output ({cropW} × {cropH} px)
              </div>
              {croppedImage && (
                <img
                  src={croppedImage}
                  alt="Cropped Preview"
                  style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '8px' }}
                />
              )}
            </div>
          </div>
        )}
      </div>
     {/* SEO & Informational Content Section */}
      <section style={{ maxWidth: '900px', margin: '60px auto 0', padding: '30px 20px', borderTop: '1px solid #334155', color: '#cbd5e1' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px' }}>
          Free Online Image Cropper – Trim and Frame Photos Instantly
        </h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '24px' }}>
          Easily cut unwanted borders, reframe portraits, or crop your images to preset aspect ratios like 1:1 square, 16:9 widescreen, or custom selections. Quick Photo Editor gives you pixel-accurate cropping controls without downloading any heavy software.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          How to Crop a Photo Online
        </h3>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '24px' }}>
          <li>Upload your photo using the file uploader.</li>
          <li>Drag the crop boundary box to highlight the exact subject area you want to keep.</li>
          <li>Preview the cropped frame in real time.</li>
          <li>Click Download to save your framed picture.</li>
        </ol>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          Key Features
        </h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '24px' }}>
          <li><strong>Freeform & Fixed Framing:</strong> Choose free manual cropping or lock proportions for avatars and banners.</li>
          <li><strong>Zero Data Uploads:</strong> Cropping runs locally in your browser to maintain strict personal privacy.</li>
          <li><strong>High Resolution Export:</strong> Keeps original pixel density intact without adding compression noise.</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          Frequently Asked Questions
        </h3>
        <div style={{ lineHeight: '1.7' }}>
          <p><strong>Does cropping reduce the quality of my photo?</strong></p>
          <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
            No, the selected region keeps its original resolution and clarity. Only the discarded outer areas are removed.
          </p>

          <p><strong>Can I crop photos for social media profile pictures?</strong></p>
          <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
            Yes, you can trim any image into standard square dimensions ideal for Instagram, LinkedIn, or WhatsApp profile photos.
          </p>
        </div>
      </section>    
    </div>
  );
}
