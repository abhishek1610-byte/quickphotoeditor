 'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AddText() {
  const [imageSrc, setImageSrc] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);

  // Text details
  const [line1, setLine1] = useState('NAME SURNAME');
  const [line2, setLine2] = useState('DOB/DOP: 01-01-2026');
  const [fontSize, setFontSize] = useState(26);
  const [textColor, setTextColor] = useState('#000000');

  // Position and Strip controls
  const [showStrip, setShowStrip] = useState(true);
  const [stripColor, setStripColor] = useState('#ffffff');
  const [stripHeight, setStripHeight] = useState(65);
  const [posX, setPosX] = useState(50); // percentage 0 to 100
  const [posY, setPosY] = useState(90); // percentage 0 to 100
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
        setImageSrc(event.target.result);
        renderCanvas(event.target.result, line1, line2, fontSize, textColor, showStrip, stripColor, stripHeight, posX, posY);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCanvas = (src, l1, l2, fSize, tColor, strip, sColor, sHeight, xPct, yPct) => {
    if (!src) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0);

      // Coordinates
      const currentX = (canvas.width * xPct) / 100;
      const currentY = (canvas.height * yPct) / 100;

      // Draw Nameplate Strip if enabled
      if (strip) {
        ctx.fillStyle = sColor;
        const boxH = (canvas.height * sHeight) / 500;
        ctx.fillRect(0, currentY - boxH / 2, canvas.width, boxH);
      }

      // Draw Text
      ctx.textAlign = 'center';
      ctx.font = `bold ${fSize}px sans-serif`;
      ctx.fillStyle = tColor;

      if (l1.trim() && l2.trim()) {
        ctx.fillText(l1, currentX, currentY - fSize * 0.2);
        ctx.font = `${Math.round(fSize * 0.8)}px sans-serif`;
        ctx.fillText(l2, currentX, currentY + fSize * 0.85);
      } else if (l1.trim()) {
        ctx.fillText(l1, currentX, currentY + fSize * 0.3);
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setOutputSize(blob.size);
            setResultImage(URL.createObjectURL(blob));
            setIsProcessing(false);
          }
        },
        'image/jpeg',
        0.95
      );
    };
  };

  const update = (l1, l2, fSize, tColor, strip, sColor, sHeight, xPct, yPct) => {
    setLine1(l1);
    setLine2(l2);
    setFontSize(fSize);
    setTextColor(tColor);
    setShowStrip(strip);
    setStripColor(sColor);
    setStripHeight(sHeight);
    setPosX(xPct);
    setPosY(yPct);

    if (imageSrc) {
      renderCanvas(imageSrc, l1, l2, fSize, tColor, strip, sColor, sHeight, xPct, yPct);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', padding: '30px 16px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginTop: '16px', marginBottom: '8px' }}>
          Photo Text & Passport Nameplate Editor
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Add custom watermarks or standard passport name/date strips with exact position sliders.
        </p>

        {!imageSrc && (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '2px dashed #334155', borderRadius: '16px', cursor: 'pointer', backgroundColor: '#1e293b' }}>
            <span style={{ fontSize: '32px', marginBottom: '8px' }}>✍️</span>
            <span style={{ fontWeight: '600', color: '#38bdf8' }}>Select Photo to Add Text / Strip</span>
            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Passport photo & watermark tool</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        )}

        {imageSrc && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {/* Control Sidebar */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155', height: 'fit-content' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '14px', color: '#e2e8f0' }}>Text & Strip Settings</h3>

              {/* Text Inputs */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Line 1 (Name / Title)</label>
                <input
                  type="text"
                  value={line1}
                  onChange={(e) => update(e.target.value, line2, fontSize, textColor, showStrip, stripColor, stripHeight, posX, posY)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Line 2 (Date of Photo / DOP)</label>
                <input
                  type="text"
                  value={line2}
                  onChange={(e) => update(line1, e.target.value, fontSize, textColor, showStrip, stripColor, stripHeight, posX, posY)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Strip (Nameplate Box) Toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', marginBottom: '14px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showStrip}
                  onChange={(e) => update(line1, line2, fontSize, textColor, e.target.checked, stripColor, stripHeight, posX, posY)}
                />
                Show White Nameplate Strip (Passport Mode)
              </label>

              {showStrip && (
                <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: '#94a3b8' }}>Strip Height</span>
                    <strong style={{ color: '#38bdf8' }}>{stripHeight}px</strong>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    value={stripHeight}
                    onChange={(e) => update(line1, line2, fontSize, textColor, showStrip, stripColor, Number(e.target.value), posX, posY)}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>
              )}

              {/* Up/Down (Y Axis) Position */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Vertical Position (Up / Down)</span>
                  <strong style={{ color: '#38bdf8' }}>{posY}%</strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={posY}
                  onChange={(e) => update(line1, line2, fontSize, textColor, showStrip, stripColor, stripHeight, posX, Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              {/* Left/Right (X Axis) Position */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Horizontal Position (Left / Right)</span>
                  <strong style={{ color: '#38bdf8' }}>{posX}%</strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={posX}
                  onChange={(e) => update(line1, line2, fontSize, textColor, showStrip, stripColor, stripHeight, Number(e.target.value), posY)}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              {/* Font Size & Colors */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Font Size ({fontSize}px)</label>
                  <input
                    type="range"
                    min="14"
                    max="80"
                    value={fontSize}
                    onChange={(e) => update(line1, line2, Number(e.target.value), textColor, showStrip, stripColor, stripHeight, posX, posY)}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>
                <div style={{ width: '60px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => update(line1, line2, fontSize, e.target.value, showStrip, stripColor, stripHeight, posX, posY)}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              {/* Live Size Badge */}
              <div style={{ backgroundColor: '#0f172a', padding: '14px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>Original Size:</span>
                  <strong style={{ color: '#e2e8f0' }}>{formatSize(originalSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#38bdf8' }}>Output File Size:</span>
                  <strong style={{ color: '#34d399' }}>{formatSize(outputSize)}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={resultImage}
                  download="passport-labeled-photo.jpg"
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
                  {isProcessing ? 'Processing...' : 'Download Photo'}
                </a>
                <button
                  onClick={() => { setImageSrc(null); setResultImage(null); }}
                  style={{ padding: '12px', backgroundColor: '#334155', border: 'none', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Live Visual Preview */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>Live Preview</div>
              {resultImage && (
                <img
                  src={resultImage}
                  alt="Live Preview"
                  style={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'contain', borderRadius: '8px' }}
                />
              )}
            </div>
          </div>
        )}
      </div>
     {/* SEO & Informational Content Section */}
      <section style={{ maxWidth: '900px', margin: '60px auto 0', padding: '30px 20px', borderTop: '1px solid #334155', color: '#cbd5e1' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px' }}>
          Free Online Text on Photo Editor – Add Captions, Watermarks & Typography
        </h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '24px' }}>
          Add custom labels, captions, memes, or personalized watermarks directly onto your photos. Quick Photo Editor gives you instant controls for font styling, placement, and color palettes right inside your browser without installing complex desktop software.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          How to Add Text to an Image
        </h3>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '24px' }}>
          <li>Upload your photo from your device.</li>
          <li>Type your custom text in the input box.</li>
          <li>Customize the font size, color, and positioning to complement your picture.</li>
          <li>Click Download to save your customized graphic immediately.</li>
        </ol>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          Key Features
        </h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '24px' }}>
          <li><strong>Instant Watermarking:</strong> Protect personal photography or branding assets effortlessly.</li>
          <li><strong>Client-Side Processing:</strong> No server uploads; images render safely inside your local browser memory.</li>
          <li><strong>Crisp Typography:</strong> Preserves original photo dimensions and produces sharp text overlays.</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          Frequently Asked Questions
        </h3>
        <div style={{ lineHeight: '1.7' }}>
          <p><strong>Can I use this tool to create memes?</strong></p>
          <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
            Yes, you can upload meme templates and overlay bold header or footer text quickly.
          </p>

          <p><strong>Does adding text reduce the photo quality?</strong></p>
          <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
            No, the rendered canvas uses your original image resolution, ensuring no loss in photo clarity.
          </p>
        </div>
      </section>    
    </div>
  );
}
