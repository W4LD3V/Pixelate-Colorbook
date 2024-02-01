"use client"; // This is a client component 👈🏽

import Image from "next/image";
import { useState, useRef } from "react";

export default function UsersPage() {
  const [image, setImage] = useState(null);
  const [responseImage, setResponseImage] = useState(null);
  const [pixelSize, setPixelSize] = useState('');
  const [numColors, setNumColors] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [colorMap, setColorMap] = useState([]);
  const [pixelatedImage, setPixelatedImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (fileInputRef.current.files[0]) {
      const formData = new FormData();
      formData.append('input_image', fileInputRef.current.files[0]);
      formData.append('pixel_size', pixelSize);
      formData.append('num_colors', numColors);
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
          method: 'POST',
          body: formData,
        });        
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const responseData = await response.json();
        setResponseImage(responseData.gridImage); // Set the grid image
        setPixelatedImage(responseData.pixelatedImage); // Set the pixelated image
        setColorMap(responseData.colorMap); // Set the color map
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch image.');
      } finally {
        setLoading(false);
      }
    }
  };  

  return (
    <main className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="image-upload" className="block mb-2 text-sm font-bold text-gray-700">Upload Image:</label>
          <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="p-2 border rounded"/>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="pixel-size" className="block mb-2 text-sm font-bold text-gray-700">Pixel Size:</label>
            <input type="number" id="pixel-size" value={pixelSize} onChange={(e) => setPixelSize(e.target.value)} className="w-full p-2 border rounded"/>
          </div>

          <div>
            <label htmlFor="num-colors" className="block mb-2 text-sm font-bold text-gray-700">Number of Colors:</label>
            <input type="number" id="num-colors" value={numColors} onChange={(e) => setNumColors(e.target.value)} className="w-full p-2 border rounded"/>
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {image && (
          <div>
            <p>Uploaded Image:</p>
            <Image src={image} alt="Uploaded Image" width={200} height={200}/>
          </div>
        )}
        {pixelatedImage && (
          <div>
            <p>Pixelated Image:</p>
            <Image src={pixelatedImage} alt="Pixelated Image" width={200} height={200}/>
          </div>
        )}
        {responseImage && (
          <div>
            <p>Response Image:</p>
            <Image src={responseImage} alt="Response Image" width={200} height={200}/>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Color Map</h2>
        <table className="w-full mt-2 border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 text-gray-800 w-1/4">Color Number</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800 w-1/4">Hex Code</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800 w-1/2">Color</th>
            </tr>
          </thead>
          <tbody>
            {colorMap.map((item) => (
              <tr key={item.colorNumber}>
                <td className="border border-gray-400 px-4 py-2 w-1/4">{item.colorNumber}</td>
                <td className="border border-gray-400 px-4 py-2 w-1/4">{item.hexCode}</td>
                <td className="border border-gray-400 px-4 py-2 w-1/2" style={{ backgroundColor: item.hexCode }}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}