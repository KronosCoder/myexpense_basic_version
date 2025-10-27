"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Wallet } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    console.log("Login submitted:", formData);
    alert("Login successful!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">
      {/* background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* main card */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-2xl transform rotate-1 rounded-2xl"></div>
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* header */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-400 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                <Wallet  className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 leading-4">ยินดีต้อนรับกลับ</h1>
            <p className="text-indigo-100">เข้าสู่ระบบเพื่อดำเนินการต่อไปยังบัญชีของคุณ</p>
          </div>

          {/* form */}
          <div className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">อีเมล</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">รหัสผ่าน</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-400 hover:text-indigo-600 transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-600">จำการเข้าสู่ระบบ</span>
              </label>
              <a href="#" className="text-indigo-500 hover:text-indigo-800 font-medium transition cursor-pointer hover:underline">
                ลืมรหัสผ่าน?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 cursor-pointer"
            >
              เข้าสู่ระบบ
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ยังไม่มีบัญชี?{" "}
                <Link href={'/auth/register'} className="text-indigo-600 hover:underline hover:text-indigo-800 font-semibold transition">
                  ลงทะเบียนเลย!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
