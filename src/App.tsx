import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { KidProfilesPage } from './pages/KidProfilesPage';
import { ProfileSelectionPage } from './pages/ProfileSelectionPage';
import { SubjectSelectionPage } from './pages/SubjectSelectionPage';
import { DifficultySelectionPage } from './pages/DifficultySelectionPage';
import { GamePage } from './pages/GamePage';
import { GameProvider } from './context/GameContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Analytics } from '@vercel/analytics/react';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <div className="w-full min-h-[100svh] bg-[#f7f7f5] text-[#000000]">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <KidProfilesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kid-profiles"
                element={
                  <ProtectedRoute>
                    <KidProfilesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile-selection"
                element={
                  <ProtectedRoute>
                    <ProfileSelectionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subjects"
                element={
                  <ProtectedRoute>
                    <SubjectSelectionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/difficulty/:subject"
                element={
                  <ProtectedRoute>
                    <DifficultySelectionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/play/:subject/:difficulty"
                element={
                  <ProtectedRoute>
                    <GamePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Analytics />
          </div>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
}
