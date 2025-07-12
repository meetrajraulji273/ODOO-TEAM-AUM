import React, { useState } from 'react';
import { Search, Upload, Heart, MessageCircle, User, Plus, ArrowLeft, MapPin, Clock, Tag, Star } from 'lucide-react';

const ItemListing = () => {
  const [currentScreen, setCurrentScreen] = useState('listing');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample data for items
  const sampleItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      description: "Classic vintage denim jacket in excellent condition. Perfect for layering and adding a retro touch to any outfit.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      uploader: "Sarah M.",
      location: "Downtown",
      condition: "Excellent",
      size: "M",
      category: "Jackets",
      tags: ["vintage", "denim", "casual"],
      uploadDate: "2 days ago",
      likes: 12,
      status: "available"
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      description: "Beautiful floral print dress perfect for summer occasions. Lightweight and comfortable fabric.",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
      uploader: "Emma L.",
      location: "Westside",
      condition: "Like New",
      size: "S",
      category: "Dresses",
      tags: ["floral", "summer", "casual"],
      uploadDate: "1 day ago",
      likes: 8,
      status: "available"
    },
    {
      id: 3,
      title: "Leather Boots",
      description: "High-quality leather boots with minimal wear. Great for both casual and semi-formal occasions.",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop",
      uploader: "Mike R.",
      location: "Eastside",
      condition: "Good",
      size: "9",
      category: "Shoes",
      tags: ["leather", "boots", "formal"],
      uploadDate: "3 days ago",
      likes: 15,
      status: "available"
    },
    {
      id: 4,
      title: "Cozy Knit Sweater",
      description: "Soft and warm knit sweater perfect for cooler weather. Minimal pilling and well-maintained.",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
      uploader: "Lisa K.",
      location: "Northside",
      condition: "Good",
      size: "L",
      category: "Sweaters",
      tags: ["knit", "cozy", "winter"],
      uploadDate: "5 days ago",
      likes: 6,
      status: "available"
    }
  ];

  const [items, setItems] = useState(sampleItems);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    tags: ''
  });

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    if (newItem.title && newItem.description) {
      const item = {
        id: items.length + 1,
        ...newItem,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop",
        uploader: "You",
        location: "Your Location",
        uploadDate: "Just now",
        likes: 0,
        status: "available",
        tags: newItem.tags.split(',').map(tag => tag.trim())
      };
      setItems([item, ...items]);
      setNewItem({ title: '', description: '', category: '', size: '', condition: '', tags: '' });
      setShowAddForm(false);
    }
  };

  const ItemCard = ({ item }) => (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
      onClick={() => {
        setSelectedItem(item);
        setCurrentScreen('detail');
      }}
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          <Heart className="w-4 h-4 text-gray-600" />
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
          {item.condition}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            <span>{item.uploader}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{item.location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-medium text-indigo-600">Size: {item.size}</span>
          <div className="flex items-center">
            <Heart className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-gray-600">{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ItemListingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ReWear
              </h1>
              <span className="ml-2 text-sm text-gray-600">Community Clothing Exchange</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </button>
              <User className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for clothing items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Item</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload images</p>
                </div>
              </div>

              <input
                type="text"
                placeholder="Item title"
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />

              <textarea
                placeholder="Item description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Category</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Pants">Pants</option>
                  <option value="Accessories">Accessories</option>
                </select>

                <input
                  type="text"
                  placeholder="Size"
                  value={newItem.size}
                  onChange={(e) => setNewItem({...newItem, size: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <select
                value={newItem.condition}
                onChange={(e) => setNewItem({...newItem, condition: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Condition</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newItem.tags}
                onChange={(e) => setNewItem({...newItem, tags: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ItemDetailScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentScreen('listing')}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Item Details
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={selectedItem?.image} 
                alt={selectedItem?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Item Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedItem?.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{selectedItem?.description}</p>
            </div>

            {/* Uploader Info */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedItem?.uploader}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{selectedItem?.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>Posted {selectedItem?.uploadDate}</span>
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Item Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium">{selectedItem?.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Size</span>
                  <p className="font-medium">{selectedItem?.size}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Condition</span>
                  <p className="font-medium">{selectedItem?.condition}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Availability</span>
                  <p className="font-medium text-green-600 capitalize">{selectedItem?.status}</p>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mt-4">
                <span className="text-sm text-gray-500">Tags</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedItem?.tags?.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Send Swap Request
              </button>
              <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105">
                Redeem via Points
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Message Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentScreen === 'listing' ? <ItemListingScreen /> : <ItemDetailScreen />}
    </div>
  );
};

export default ItemListing;