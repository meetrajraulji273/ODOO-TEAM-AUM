import React from 'react'
import RegisterForm from '../pages/Register'
import Login from '../pages/Login'
import { Navigate, Route, Routes } from 'react-router'

function AuthRouter() { 
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<RegisterForm/>} path="/register"/>
      <Route element={<Navigate to="/" replace />} path="/logout" />

      <Route element={<Login />} path="/dashboard" />
      <Route element={<Navigate to="/" />} path="/logout" />
    </Routes> 
  )
}

export default AuthRouter