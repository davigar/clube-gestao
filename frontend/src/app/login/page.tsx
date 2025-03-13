'use client';

import LoginForm from '@/components/auth/LoginForm';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Clube Gestão</h1>
          <p className="mt-2 text-sm text-gray-600">
            Entre com sua conta para acessar o sistema
          </p>
        </div>
        
        <Card>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}