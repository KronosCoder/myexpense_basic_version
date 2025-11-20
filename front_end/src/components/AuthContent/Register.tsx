"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Wallet } from "lucide-react";
import swal from "sweetalert2";
import { getRegister } from "@/lib/auth";

interface RegisterPageProps {
  isCurrForm: string;
  onSwitch: () => void;
}

type formDataType = {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage({ isCurrForm , onSwitch }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataType>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await getRegister(formData);
      if (!isLoading && response.data.success) {
        return swal.fire({
          title: "เรียบร้อย!",
          icon: "success",
          text: "ลงทะเบียนสำเร็จแล้ว",
          showConfirmButton: true,
          confirmButtonText: "เข้าสู่ระบบเลย",
        })
      }

    } catch (err: any) {
        const response = err.response?.data;
        return swal.fire({
          title: "ผิดพลาด",
          icon: "error",
          text: response.message,
          showConfirmButton: true,
          confirmButtonText: "เข้าใจแล้ว",  
        })
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* main card */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-2xl transform rotate-1 rounded-2xl"></div>
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* header */}
           <div className="bg-gradient-to-r from-indigo-500 to-blue-400 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                <Wallet  className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 leading-4">สร้างบัญชี</h1>
            <p className="text-indigo-100">สร้างบัญชีของคุณเพื่อเริ่มเข้าใช้งาน</p>
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">ยืนยันรหัสผ่าน</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isLoading ? (
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 cursor-pointer"
              >
                สร้างบัญชีเลย
              </button>
            ):(
              <button
                disabled={true}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg cursor-not-allowed flex justify-center gap-2"
              >
                <svg className="h-6 w-6 animate-spin" viewBox="0 0 100 100">
                  <circle
                    fill="none"
                    strokeWidth="10"
                    className="stroke-current opacity-40"
                    cx="50"
                    cy="50"
                    r="40"
                  />
                  <circle
                    fill="none"
                    strokeWidth="10"
                    className="stroke-current"
                    strokeDasharray="250"
                    strokeDashoffset="210"
                    cx="50"
                    cy="50"
                    r="40"
                  />
                </svg>

                กำลังสร้างบัญชี . . .
              </button>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                มีบัญชีอยู่แล้ว?{" "}
                <button onMouseDown={onSwitch} className="text-indigo-600 hover:text-indigo-800 hover:underline font-semibold transition cursor-pointer">
                  เข้าสู่ระบบ
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
