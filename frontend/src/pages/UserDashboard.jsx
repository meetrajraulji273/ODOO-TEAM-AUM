// App.js
import React, { useState } from 'react';

// Main App component
function UserDashboard() {
  // Mock data for demonstration
  const userProfile = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    pointsBalance: 150,
    profilePic: 'https://placehold.co/120x120/A78BFA/ffffff?text=JD', // Placeholder image
  };

  const myListings = [
    { id: 1, name: 'Blue Denim Jacket', status: 'Active', imageUrl: 'https://placehold.co/150x150/60A5FA/ffffff?text=Jacket' },
    { id: 2, name: 'Vintage T-Shirt', status: 'Pending Swap', imageUrl: 'https://placehold.co/150x150/4ADE80/ffffff?text=T-Shirt' },
    { id: 3, name: 'Black Dress', status: 'Sold', imageUrl: 'https://placehold.co/150x150/F87171/ffffff?text=Dress' },
    { id: 4, name: 'Sneakers', status: 'Active', imageUrl: 'https://placehold.co/150x150/FBBF24/ffffff?text=Shoes' },
  ];

  const myPurchases = [
    { id: 101, name: 'Red Scarf', status: 'Completed', imageUrl: 'https://placehold.co/150x150/EC4899/ffffff?text=Scarf' },
    { id: 102, name: 'Leather Bag', status: 'Ongoing', imageUrl: 'https://placehold.co/150x150/8B5CF6/ffffff?text=Bag' },
    { id: 103, name: 'Winter Coat', status: 'Completed', imageUrl: 'https://placehold.co/150x150/10B981/ffffff?text=Coat' },
    { id: 104, name: 'Jeans', status: 'Ongoing', imageUrl: 'https://placehold.co/150x150/3B82F6/ffffff?text=Jeans' },
  ];

  // State for the item description generator modal
  const [showDescriptionGenerator, setShowDescriptionGenerator] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemCondition, setItemCondition] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');

  // Function to generate item description using Gemini API
  const generateDescription = async () => {
    setGeneratedDescription('');
    setGenerationError('');
    setIsGenerating(true);

    const prompt = `Generate a concise and appealing description for a clothing item with the following details:
    Item Name: ${itemName}
    Item Type: ${itemType}
    Condition: ${itemCondition}
    Focus on highlighting its best features for a community clothing exchange platform. Keep it under 100 words.`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedDescription(text);
      } else {
        setGenerationError('Failed to generate description. Please try again.');
        console.error('Unexpected API response structure:', result);
      }
    } catch (error) {
      setGenerationError('Error connecting to the API. Please check your network and try again.');
      console.error('Error generating description:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to copy generated text to clipboard
  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = generatedDescription;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    // Optionally, show a temporary success message
    alert('Description copied to clipboard!'); // Using alert for simplicity, consider a custom modal for production
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 font-inter p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 drop-shadow-sm">User Dashboard</h1>
      </header>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Details and Points Balance */}
        <div className="lg:col-span-1 bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <img
            src={userProfile.profilePic}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-purple-300 shadow-lg mb-4 ring-4 ring-purple-100"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/A78BFA/ffffff?text=JD"; }} // Fallback image
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{userProfile.name}</h2>
          <p className="text-gray-600 mb-4 text-sm">{userProfile.email}</p>
          <div className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-lg font-semibold shadow-inner tracking-wide">
            Points: {userProfile.pointsBalance} ✨
          </div>
        </div>

        {/* Profile Details - Right Section (Placeholder for additional info) */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-purple-200 pb-2">Account Information</h3>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Member Since:</strong> January 2023</p>
              <p className="text-gray-700"><strong className="font-medium">Location:</strong> New York, USA</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-purple-200 pb-2">Preferences</h3>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Preferred Categories:</strong> Casual Wear, Accessories</p>
              <p className="text-gray-700"><strong className="font-medium">Sizes:</strong> M, L</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5 shadow-inner border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <ul className="space-y-3">
              <li>
                <button
                  className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:from-indigo-600 hover:to-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                  onClick={() => setShowDescriptionGenerator(true)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  Upload New Item
                </button>
              </li>
              <li>
                <button className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:from-green-600 hover:to-teal-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  Browse Items
                </button>
              </li>
              <li>
                <button className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:from-yellow-600 hover:to-orange-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  Messages
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Item Description Generator Modal */}
      {showDescriptionGenerator && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform scale-95 animate-scale-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">✨ Generate Item Description</h2>
            <div className="space-y-5 mb-7">
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g., Blue Denim Jacket"
                />
              </div>
              <div>
                <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
                <input
                  type="text"
                  id="itemType"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  placeholder="e.g., Outerwear, Casual"
                />
              </div>
              <div>
                <label htmlFor="itemCondition" className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <input
                  type="text"
                  id="itemCondition"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                  value={itemCondition}
                  onChange={(e) => setItemCondition(e.target.value)}
                  placeholder="e.g., Excellent, Gently Used"
                />
              </div>
            </div>

            <button
              onClick={generateDescription}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-fuchsia-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              disabled={isGenerating || !itemName || !itemType || !itemCondition}
            >
              {isGenerating ? 'Generating...' : '✨ Generate Description'}
            </button>

            {generationError && (
              <p className="text-red-600 text-sm mt-4 text-center">{generationError}</p>
            )}

            {generatedDescription && (
              <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Generated Description:</h3>
                <textarea
                  className="w-full p-2 bg-transparent border-none resize-none outline-none text-gray-700 font-light leading-relaxed"
                  rows="6"
                  readOnly
                  value={generatedDescription}
                ></textarea>
                <button
                  onClick={copyToClipboard}
                  className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-cyan-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                  Copy to Clipboard
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setShowDescriptionGenerator(false);
                setGeneratedDescription('');
                setItemName('');
                setItemType('');
                setItemCondition('');
                setGenerationError('');
              }}
              className="mt-7 w-full py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-xl shadow-md hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* My Listings Section */}
      <section className="bg-white rounded-3xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-purple-200 pb-3">My Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myListings.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out border border-gray-100">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/60A5FA/ffffff?text=Item"; }} // Fallback image
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className={`text-sm font-medium ${
                  item.status === 'Active' ? 'text-green-600' :
                  item.status === 'Pending Swap' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  Status: {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My Purchases Section */}
      <section className="bg-white rounded-3xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-purple-200 pb-3">My Purchases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myPurchases.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out border border-gray-100">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/EC4899/ffffff?text=Item"; }} // Fallback image
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className={`text-sm font-medium ${
                  item.status === 'Completed' ? 'text-blue-600' : 'text-purple-600'
                }`}>
                  Status: {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
