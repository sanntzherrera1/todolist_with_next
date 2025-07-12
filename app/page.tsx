import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <Card className="p-8 mt-10 w-full text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Bienvenido a la App de Tareas</h1>
          <p className="mb-6 text-gray-600">Organiza tus tareas diarias de manera sencilla y eficiente.</p>
          <Link href="/ToDoList">
            <Button className="w-full mt-2">Ir a la lista de tareas</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
