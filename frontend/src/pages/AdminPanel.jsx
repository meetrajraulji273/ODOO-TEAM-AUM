import React, { useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  List, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Ban, 
  Shield, 
  UserCheck, 
  AlertTriangle,
  MoreVertical,
  Filter,
  Download,
  Bell,
  Settings,
  LogOut,
  Home,
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample data
  const sampleUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=100&h=100&fit=crop&crop=face",
      status: "Active",
      joinDate: "2024-01-15",
      itemsListed: 12,
      swapsCompleted: 8,
      location: "New York, NY",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "Pending",
      joinDate: "2024-02-20",
      itemsListed: 5,
      swapsCompleted: 2,
      location: "Los Angeles, CA",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "Suspended",
      joinDate: "2024-01-08",
      itemsListed: 20,
      swapsCompleted: 15,
      location: "Chicago, IL",
      lastActive: "3 days ago"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      status: "Active",
      joinDate: "2024-03-01",
      itemsListed: 8,
      swapsCompleted: 6,
      location: "Miami, FL",
      lastActive: "30 minutes ago"
    }
  ];

  const sampleOrders = [
    {
      id: 1,
      orderNumber: "ORD-001",
      buyer: "Sarah Johnson",
      seller: "Michael Chen",
      item: "Vintage Denim Jacket",
      type: "Swap",
      status: "Pending",
      date: "2024-07-10",
      value: "$45"
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      buyer: "Emma Rodriguez",
      seller: "James Wilson",
      item: "Summer Floral Dress",
      type: "Points",
      status: "Completed",
      date: "2024-07-08",
      value: "150 pts"
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      buyer: "James Wilson",
      seller: "Sarah Johnson",
      item: "Leather Boots",
      type: "Swap",
      status: "Disputed",
      date: "2024-07-05",
      value: "$80"
    }
  ];

  const sampleListings = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      seller: "Michael Chen",
      category: "Jackets",
      condition: "Excellent",
      status: "Pending Review",
      datePosted: "2024-07-12",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop",
      flagged: false
    },
    {
      id: 2,
      title: "Designer Handbag",
      seller: "Emma Rodriguez",
      category: "Accessories",
      condition: "Like New",
      status: "Approved",
      datePosted: "2024-07-11",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop",
      flagged: true
    },
    {
      id: 3,
      title: "Workout Sneakers",
      seller: "James Wilson",
      category: "Shoes",
      condition: "Good",
      status: "Rejected",
      datePosted: "2024-07-10",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
      flagged: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'pending review':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
      case 'rejected':
      case 'disputed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const UserRow = ({ user }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400">{user.location}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                {user.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">Last active: {user.lastActive}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
            <span>{user.itemsListed} items listed</span>
            <span>{user.swapsCompleted} swaps completed</span>
            <span>Joined {user.joinDate}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
            View Profile
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
            Edit User
          </button>
        </div>
      </div>
    </div>
  );

  const OrderRow = ({ order }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
            <p className="text-sm text-gray-600">{order.item}</p>
            <p className="text-xs text-gray-500">{order.buyer} → {order.seller}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          <p className="text-sm text-gray-600 mt-1">{order.value}</p>
          <p className="text-xs text-gray-500">{order.date}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
            View Details
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
            Take Action
          </button>
        </div>
      </div>
    </div>
  );

  const ListingRow = ({ listing }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img 
            src={listing.image} 
            alt={listing.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          {listing.flagged && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
              <AlertTriangle className="w-3 h-3" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{listing.title}</h3>
              <p className="text-sm text-gray-500">by {listing.seller}</p>
              <p className="text-xs text-gray-400">{listing.category} • {listing.condition}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                {listing.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">Posted {listing.datePosted}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors">
            Approve
          </button>
          <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors">
            Reject
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
            <div className="grid gap-4">
              {sampleUsers.map(user => (
                <UserRow key={user.id} user={user} />
              ))}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Manage Orders</h2>
            <div className="grid gap-4">
              {sampleOrders.map(order => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          </div>
        );
      case 'listings':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Manage Listings</h2>
            <div className="grid gap-4">
              {sampleListings.map(listing => (
                <ListingRow key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ReWear Admin
              </h1>
              <span className="ml-2 text-sm text-gray-500">Dashboard</span>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, orders, listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'users'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Manage Users
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'orders'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ShoppingBag className="w-4 h-4 inline mr-2" />
              Manage Orders
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'listings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <List className="w-4 h-4 inline mr-2" />
              Manage Listings
            </button>
          </div>
        </div>
      </nav>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Orders</p>
                <p className="text-2xl font-bold text-gray-900">432</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <List className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Flagged Items</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {activeTab === 'users' && `${sampleUsers.length} users`}
              {activeTab === 'orders' && `${sampleOrders.length} orders`}
              {activeTab === 'listings' && `${sampleListings.length} listings`}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-50 rounded-lg p-6">
          {renderContent()}
        </div>
      </div>

      {/* Admin Role Info Panel */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-w-sm">
        <h3 className="font-semibold text-gray-900 mb-2">Admin Role</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-2" />
            Moderate and approve/reject item listings
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-2" />
            Remove inappropriate or spam items
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-2" />
            Lightweight admin panel for oversight
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;