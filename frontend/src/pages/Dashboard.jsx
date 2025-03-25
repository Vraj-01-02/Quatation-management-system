"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import {
  Menu,
  X,
  Home,
  Users,
  ClipboardList,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  PlusCircle,
  Search,
} from "lucide-react"

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Dummy Data
  const dashboardData = {
    stats: [
      { title: "Total Customers", value: "1,200", change: "+12%", isPositive: true },
      { title: "Pending Quotations", value: "245", change: "+8%", isPositive: true },
      { title: "Approved Invoices", value: "860", change: "+15%", isPositive: true },
      { title: "Monthly Revenue", value: "$24,500", change: "-3%", isPositive: false },
    ],
    chartData: [
      { month: "Jan", quotations: 30, invoices: 25 },
      { month: "Feb", quotations: 50, invoices: 45 },
      { month: "Mar", quotations: 80, invoices: 65 },
      { month: "Apr", quotations: 45, invoices: 40 },
      { month: "May", quotations: 90, invoices: 75 },
      { month: "Jun", quotations: 60, invoices: 55 },
    ],
    recentQuotations: [
      { id: "Q-2023-06-001", client: "Acme Inc.", amount: "$2,450.00", status: "Pending", date: "Jun 15, 2023" },
      { id: "Q-2023-06-002", client: "Globex Corp.", amount: "$1,850.00", status: "Approved", date: "Jun 12, 2023" },
      { id: "Q-2023-06-003", client: "Stark Industries", amount: "$3,200.00", status: "Pending", date: "Jun 10, 2023" },
    ],
  }

  const customersData = [
    { id: "C-001", name: "Acme Inc.", email: "contact@acme.com", status: "Active", lastOrder: "Jun 14, 2023" },
    { id: "C-002", name: "Globex Corp.", email: "info@globex.com", status: "Active", lastOrder: "Jun 10, 2023" },
    { id: "C-003", name: "Stark Industries", email: "sales@stark.com", status: "Inactive", lastOrder: "May 20, 2023" },
    { id: "C-004", name: "Wayne Enterprises", email: "orders@wayne.com", status: "Active", lastOrder: "Jun 01, 2023" },
  ]

  const quotationsData = [
    { id: "Q-2023-06-001", client: "Acme Inc.", amount: "$2,450.00", status: "Pending", date: "Jun 15, 2023" },
    { id: "Q-2023-06-002", client: "Globex Corp.", amount: "$1,850.00", status: "Approved", date: "Jun 12, 2023" },
    { id: "Q-2023-06-003", client: "Stark Industries", amount: "$3,200.00", status: "Pending", date: "Jun 10, 2023" },
    { id: "Q-2023-05-012", client: "Wayne Enterprises", amount: "$4,500.00", status: "Approved", date: "May 28, 2023" },
  ]

  const invoicesData = [
    { id: "I-2023-06-001", client: "Acme Inc.", amount: "$1,800.00", status: "Paid", dueDate: "Jun 20, 2023" },
    { id: "I-2023-06-002", client: "Globex Corp.", amount: "$1,200.00", status: "Pending", dueDate: "Jun 25, 2023" },
    { id: "I-2023-05-003", client: "Stark Industries", amount: "$2,900.00", status: "Paid", dueDate: "May 30, 2023" },
    { id: "I-2023-05-004", client: "Wayne Enterprises", amount: "$3,500.00", status: "Overdue", dueDate: "May 15, 2023" },
  ]

  const notificationsData = [
    { id: "N-001", message: "New quotation Q-2023-06-001 received", date: "Jun 15, 2023 10:30 AM" },
    { id: "N-002", message: "Invoice I-2023-05-004 is overdue", date: "Jun 14, 2023 9:15 AM" },
    { id: "N-003", message: "Customer Acme Inc. updated their profile", date: "Jun 13, 2023 2:45 PM" },
    { id: "N-004", message: "Quotation Q-2023-06-002 approved", date: "Jun 12, 2023 11:00 AM" },
  ]

  const settingsData = {
    profile: { name: "Alex Johnson", email: "alex.johnson@company.com", role: "Administrator" },
    preferences: [
      { key: "Email Notifications", value: "Enabled" },
      { key: "Dark Mode", value: "Disabled" },
      { key: "Language", value: "English" },
    ],
  }

  return (
    <div className="dashboard-container">
      <style>
        {`
          .dashboard-container {
            min-height: 100vh;
            background: #f6f8fa;
            display: flex;
            font-family: 'Inter', sans-serif;
          }

          .sidebar {
            background: #ffffff;
            width: ${isOpen ? '260px' : '80px'};
            transition: width 0.3s ease;
            border-right: 1px solid #e5e7eb;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            position: relative;
          }

          .sidebar-header {
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: ${isOpen ? 'space-between' : 'center'};
          }

          .logo {
            width: 40px;
            height: 40px;
            background: #2563eb;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
          }

          .brand-name {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1f2937;
            margin-left: 10px;
          }

          .toggle-btn {
            color: #6b7280;
            padding: 4px;
            border-radius: 4px;
          }

          .toggle-btn:hover {
            background: #f3f4f6;
            color: #374151;
          }

          .nav-list {
            padding: 20px;
          }

          .main-content {
            flex: 1;
            overflow-y: auto;
          }

          .header {
            background: #ffffff;
            padding: 16px 24px;
            border-bottom: 1px solid #e5e7eb;
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .search-bar {
            position: relative;
            width: 300px;
          }

          .search-bar input {
            width: 100%;
            padding: 8px 12px 8px 36px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: #f9fafb;
            font-size: 0.875rem;
          }

          .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
          }

          .notification-btn {
            padding: 8px;
            background: #f3f4f6;
            border-radius: 6px;
            position: relative;
          }

          .notification-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 16px;
            height: 16px;
            background: #ef4444;
            color: white;
            border-radius: 50%;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .profile-pic {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #e5e7eb;
          }

          .dashboard-body {
            padding: 24px;
          }

          .welcome-text h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1f2937;
          }

          .welcome-text p {
            color: #6b7280;
            font-size: 0.875rem;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
          }

          .stat-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            transition: box-shadow 0.2s ease;
          }

          .stat-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .content-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
          }

          .list-item {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
          }

          .list-item:last-child {
            border-bottom: none;
          }

          .status-badge {
            padding: 4px 8px;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 500;
          }

          .status-pending { background: #fef3c7; color: #d97706; }
          .status-approved { background: #d1fae5; color: #059669; }
          .status-active { background: #d1fae5; color: #059669; }
          .status-inactive { background: #f3f4f6; color: #6b7280; }
          .status-paid { background: #d1fae5; color: #059669; }
          .status-overdue { background: #fee2e2; color: #dc2626; }

          .action-btn {
            width: 100%;
            padding: 10px;
            background: #2563eb;
            color: white;
            border-radius: 6px;
            font-weight: 500;
            font-size: 0.875rem;
          }

          .action-btn:hover {
            background: #1d4ed8;
          }

          .settings-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          @media (max-width: 1024px) {
            .settings-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          {isOpen ? (
            <>
              <div className="flex items-center">
                <div className="logo">Q</div>
                <span className="brand-name">QuoteFlow</span>
              </div>
              <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                <X size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="logo">Q</div>
              <button className="toggle-btn absolute right-4" onClick={() => setIsOpen(!isOpen)}>
                <Menu size={20} />
              </button>
            </>
          )}
        </div>

        <div className="nav-list">
          <nav className="flex flex-col gap-2">
            <NavItem icon={<Home size={20} />} text="Dashboard" isOpen={isOpen} isActive={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
            <NavItem icon={<Users size={20} />} text="Customers" isOpen={isOpen} isActive={activeTab === "customers"} onClick={() => setActiveTab("customers")} />
            <NavItem icon={<ClipboardList size={20} />} text="Quotations" isOpen={isOpen} isActive={activeTab === "quotations"} onClick={() => setActiveTab("quotations")} />
            <NavItem icon={<FileText size={20} />} text="Invoices" isOpen={isOpen} isActive={activeTab === "invoices"} onClick={() => setActiveTab("invoices")} />
            <NavItem icon={<Bell size={20} />} text="Notifications" isOpen={isOpen} isActive={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} badge="5" />
            <NavItem icon={<Settings size={20} />} text="Settings" isOpen={isOpen} isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
          </nav>
        </div>

        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="profile-pic">
                <img src="/placeholder.svg?height=36&width=36" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <h1 className="text-lg font-semibold text-gray-800 capitalize">{activeTab}</h1>
            <div className="flex items-center gap-4">
              <div className="search-bar">
                <Search className="search-icon" size={18} />
                <input type="text" placeholder="Search..." />
              </div>
              <button className="notification-btn">
                <Bell size={20} className="text-gray-600" />
                <span className="notification-badge">5</span>
              </button>
              <div className="profile-pic">
                <img src="/placeholder.svg?height=36&width=36" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-body">
          {activeTab === "dashboard" && (
            <>
              <div className="welcome-text mb-8">
                <h2>Welcome back, Alex!</h2>
                <p>Here's your business overview for today, {new Date().toLocaleDateString()}.</p>
              </div>

              <div className="stats-grid">
                {dashboardData.stats.map((stat, index) => (
                  <StatCard key={index} {...stat} icon={<Users size={20} />} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="content-card lg:col-span-2">
                  <h3 className="text-base font-semibold text-gray-800 mb-6">Quotations & Invoices</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.chartData}>
                      <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
                      <YAxis tick={{ fill: "#6b7280" }} />
                      <Tooltip />
                      <Bar dataKey="quotations" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="invoices" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="content-card">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-semibold text-gray-800">Recent Quotations</h3>
                    <button className="text-sm text-[#2563eb] hover:underline flex items-center">
                      View all <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {dashboardData.recentQuotations.map((quote) => (
                      <div key={quote.id} className="list-item">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{quote.client}</p>
                            <p className="text-xs text-gray-500">{quote.id}</p>
                          </div>
                          <span className={`status-badge ${quote.status === "Approved" ? "status-approved" : "status-pending"}`}>
                            {quote.status}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm font-semibold text-gray-900">{quote.amount}</span>
                          <span className="text-xs text-gray-500">{quote.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="action-btn mt-4">
                    <PlusCircle size={16} className="mr-2 inline" />
                    Create New Quotation
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "customers" && (
            <div className="content-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-gray-800">Customer List</h3>
                <button className="action-btn w-auto px-4">
                  <PlusCircle size={16} className="mr-2 inline" />
                  Add Customer
                </button>
              </div>
              <div className="space-y-2">
                {customersData.map((customer) => (
                  <div key={customer.id} className="list-item">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                      <span className={`status-badge ${customer.status === "Active" ? "status-active" : "status-inactive"}`}>
                        {customer.status}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Last Order: {customer.lastOrder}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quotations" && (
            <div className="content-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-gray-800">Quotations</h3>
                <button className="action-btn w-auto px-4">
                  <PlusCircle size={16} className="mr-2 inline" />
                  New Quotation
                </button>
              </div>
              <div className="space-y-2">
                {quotationsData.map((quote) => (
                  <div key={quote.id} className="list-item">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{quote.client}</p>
                        <p className="text-xs text-gray-500">{quote.id}</p>
                      </div>
                      <span className={`status-badge ${quote.status === "Approved" ? "status-approved" : "status-pending"}`}>
                        {quote.status}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm font-semibold text-gray-900">{quote.amount}</span>
                      <span className="text-xs text-gray-500">{quote.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "invoices" && (
            <div className="content-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-gray-800">Invoices</h3>
                <button className="action-btn w-auto px-4">
                  <PlusCircle size={16} className="mr-2 inline" />
                  New Invoice
                </button>
              </div>
              <div className="space-y-2">
                {invoicesData.map((invoice) => (
                  <div key={invoice.id} className="list-item">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{invoice.client}</p>
                        <p className="text-xs text-gray-500">{invoice.id}</p>
                      </div>
                      <span className={`status-badge ${invoice.status === "Paid" ? "status-paid" : invoice.status === "Overdue" ? "status-overdue" : "status-pending"}`}>
                        {invoice.status}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm font-semibold text-gray-900">{invoice.amount}</span>
                      <span className="text-xs text-gray-500">Due: {invoice.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="content-card">
              <h3 className="text-base font-semibold text-gray-800 mb-6">Notifications</h3>
              <div className="space-y-2">
                {notificationsData.map((notification) => (
                  <div key={notification.id} className="list-item">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="content-card">
              <h3 className="text-base font-semibold text-gray-800 mb-6">Settings</h3>
              <div className="settings-grid">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Profile</h4>
                  <p className="text-sm text-gray-600">Name: {settingsData.profile.name}</p>
                  <p className="text-sm text-gray-600">Email: {settingsData.profile.email}</p>
                  <p className="text-sm text-gray-600">Role: {settingsData.profile.role}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Preferences</h4>
                  {settingsData.preferences.map((pref, index) => (
                    <p key={index} className="text-sm text-gray-600 mb-2">
                      {pref.key}: <span className="font-medium">{pref.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Sidebar Navigation Item
function NavItem({ icon, text, isOpen, isActive, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive ? "bg-[#2563eb] text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className={isActive ? "text-white" : ""}>{icon}</div>
      {isOpen && (
        <div className="ml-3 flex-1 flex items-center justify-between">
          <span className={`font-medium ${isActive ? "text-white" : ""}`}>{text}</span>
          {badge && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// Dashboard Stat Card
function StatCard({ title, value, change, isPositive, icon }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#2563eb]">
          {icon}
        </div>
        <div className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {change}
        </div>
      </div>
      <h3 className="text-sm text-gray-600 font-medium">{title}</h3>
      <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  )
}