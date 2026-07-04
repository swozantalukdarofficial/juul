"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, ShoppingCart, DollarSign, Clock, PackageCheck, Ban, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Currency converter helper: price in order is native string, multiply by 120 if it was USD
  // Wait, let's just use Shopify's default currency (which is likely BDT or USD)
  const formatPrice = (amount, currencyCode = "BDT") => {
    const num = parseFloat(amount || 0);
    if (currencyCode === "USD") {
      return `৳ ${(num * 120).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
    }
    return `৳ ${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  };

  const fetchOrders = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchOrders(true);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ financial_status: newStatus })
      });
      if (res.ok) {
        // Refresh orders list silently
        fetchOrders(true);
      } else {
        alert("Failed to update order status.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchOrders(true);
      } else {
        alert("Failed to cancel order.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Get payment method from order note or note_attributes
  const getPaymentMethod = (order) => {
    const attr = order.note_attributes?.find(a => a.name === "Payment Method");
    if (attr) return attr.value;
    if (order.note?.toLowerCase().includes("bkash")) return "bKash";
    if (order.note?.toLowerCase().includes("nagad")) return "Nagad";
    return "COD";
  };

  const getTransactionId = (order) => {
    const attr = order.note_attributes?.find(a => a.name === "Transaction ID");
    return attr ? attr.value : null;
  };

  // Stats calculation
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => {
    if (o.financial_status === "paid") {
      return sum + parseFloat(o.current_total_price || o.total_price || 0);
    }
    return sum;
  }, 0);
  const pendingPayments = orders.filter(o => o.financial_status === "pending").length;
  const unfulfilledOrders = orders.filter(o => !o.fulfillment_status).length;

  // Filtering
  const filteredOrders = orders.filter(order => {
    const nameMatch = (order.customer?.first_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (order.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const phoneMatch = (order.customer?.phone || "").includes(searchQuery) ||
                       (order.shipping_address?.phone || "").includes(searchQuery);
    
    const matchesSearch = nameMatch || phoneMatch;

    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "paid" && order.financial_status === "paid") ||
                         (statusFilter === "pending" && order.financial_status === "pending") ||
                         (statusFilter === "cancelled" && order.cancelled_at);

    const payMethod = getPaymentMethod(order).toLowerCase();
    const matchesPayment = paymentFilter === "all" || payMethod.includes(paymentFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="min-h-screen bg-[#09090A] text-white pt-28 pb-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Order Dashboard
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Manage headless orders from Shopify database</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-full border border-white/10 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
            Refresh Orders
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", val: totalOrders, icon: ShoppingCart, color: "text-blue-400" },
            { label: "Total Revenue (Paid)", val: formatPrice(totalRevenue, orders[0]?.currency), icon: DollarSign, color: "text-emerald-400" },
            { label: "Pending Payments", val: pendingPayments, icon: Clock, color: "text-amber-400" },
            { label: "Unfulfilled Orders", val: unfulfilledOrders, icon: PackageCheck, color: "text-purple-400" }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-950 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{stat.label}</span>
                <p className="text-xl sm:text-2xl font-black">{stat.val}</p>
              </div>
              <stat.icon className={`w-8 h-8 opacity-70 ${stat.color}`} />
            </div>
          ))}
        </div>

        {/* Filters Panel */}
        <div className="bg-zinc-950 border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search Name or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-white/5 border border-white/10 px-4 py-2.5 rounded-full outline-none text-zinc-300 focus:border-emerald-400 cursor-pointer"
            >
              <option value="all" className="bg-zinc-950 text-white">All Statuses</option>
              <option value="paid" className="bg-zinc-950 text-white">Paid</option>
              <option value="pending" className="bg-zinc-950 text-white">Pending</option>
              <option value="cancelled" className="bg-zinc-950 text-white">Cancelled</option>
            </select>

            {/* Payment Method Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="text-xs bg-white/5 border border-white/10 px-4 py-2.5 rounded-full outline-none text-zinc-300 focus:border-emerald-400 cursor-pointer"
            >
              <option value="all" className="bg-zinc-950 text-white">All Payments</option>
              <option value="COD" className="bg-zinc-950 text-white">Cash on Delivery</option>
              <option value="bKash" className="bg-zinc-950 text-white">bKash</option>
              <option value="Nagad" className="bg-zinc-950 text-white">Nagad</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-zinc-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30 text-zinc-400" />
              <p className="text-sm font-semibold">No orders found matching filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                    <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Order</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Customer</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Payment Method</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Fulfillment</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((order) => {
                    const payMethod = getPaymentMethod(order);
                    const txId = getTransactionId(order);

                    return (
                      <tr key={order.id} className="hover:bg-white/[0.01] transition-colors text-xs">
                        {/* Order Name & Time */}
                        <td className="p-4">
                          <span className="font-black text-emerald-400">{order.name}</span>
                          <p className="text-[10px] text-zinc-500 font-light mt-1">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </p>
                        </td>

                        {/* Customer Info */}
                        <td className="p-4">
                          <span className="font-bold text-zinc-200">{order.customer?.first_name || "Guest Customer"}</span>
                          <p className="text-[10px] text-zinc-500 mt-1">{order.customer?.phone || order.shipping_address?.phone || "No Phone"}</p>
                        </td>

                        {/* Payment Method & Transaction ID */}
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider inline-block w-max ${
                              payMethod === "bKash"
                                ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                                : payMethod === "Nagad"
                                ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            }`}>
                              {payMethod}
                            </span>
                            {txId && (
                              <span className="text-[9px] text-zinc-500 font-mono">
                                TxID: {txId}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status Tags */}
                        <td className="p-4">
                          <div className="flex flex-col gap-1.5">
                            {/* Financial Status */}
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider inline-block w-max uppercase ${
                              order.financial_status === "paid"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : order.financial_status === "pending"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                            }`}>
                              {order.financial_status}
                            </span>
                            {/* Fulfillment Status */}
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider inline-block w-max uppercase ${
                              order.fulfillment_status === "fulfilled"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            }`}>
                              {order.fulfillment_status || "unfulfilled"}
                            </span>
                          </div>
                        </td>

                        {/* Total Amount */}
                        <td className="p-4 font-black">
                          {formatPrice(order.current_total_price || order.total_price, order.currency)}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.financial_status !== "paid" && !order.cancelled_at && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "paid")}
                                className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500 hover:bg-emerald-400 text-black px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                              >
                                <CheckCircle className="w-3 h-3" /> Paid
                              </button>
                            )}
                            {!order.cancelled_at ? (
                              <button
                                onClick={() => cancelOrder(order.id)}
                                className="flex items-center gap-1 text-[10px] font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full border border-red-500/20 cursor-pointer transition-colors"
                              >
                                <Ban className="w-3 h-3" /> Cancel
                              </button>
                            ) : (
                              <span className="text-[10px] text-zinc-500 font-bold italic">Cancelled</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
