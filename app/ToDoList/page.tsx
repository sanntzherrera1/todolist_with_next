"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function ToDoList(){

    const [tareas, setTareas] = useState<Array<{
        id: number;
        texto: string;
        completada: boolean;
    }>>([]); // crear un estado para las tareas, el estado es un array de strings
    const [inputTarea,setInputTarea] = useState<string>(""); // creo estado del input 
    const [tareasCompletadas, setTareasCompletadas] = useState<boolean[]>([]); // creo estado para las tareas completadas

    useEffect(() => {// useEffect para cargar las tareas desde local storage
        try {// try para manejar errores
            const tareasGuardadas = localStorage.getItem("tareas");// obtengo las tareas guardadas en local storage
            if(tareasGuardadas){// si hay tareas guardadas, las convierto a un array de strings
                setTareas(JSON.parse(tareasGuardadas));// convierto las tareas a un array de strings
            }
           
        } catch (error) {
            console.error("Error al cargar tareas:", error);// manejo el error
            setTareas([]); // Fallback a array vacío
        }
    }, []);

    useEffect(() => {
        try {// try para manejar errores
            const tareasCompletadasGuardadas = localStorage.getItem("tareasCompletadas");// obtengo las tareas completadas guardadas en local storage
            if(tareasCompletadasGuardadas){// si hay tareas completadas guardadas, las convierto a un array de booleanos
                setTareasCompletadas(JSON.parse(tareasCompletadasGuardadas));// convierto las tareas completadas a un array de booleanos
            }
        } catch (error) {
            console.error("Error al cargar tareas completadas:", error);// manejo el error
            setTareasCompletadas([]); // Fallback a array vacío
        }
    }, []);

    useEffect(() => { // useEffect para guardar en local storage cuando se actualiza el estado de las tareas
        localStorage.setItem("tareas", JSON.stringify(tareas));// guardo las tareas en local storage
    }, [tareas]); // el useEffect se ejecuta cuando el estado de las tareas cambia
   
    useEffect(() => { // useEffect para guardar en local storage cuando se actualiza el estado de las tareas completadas
        localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));// guardo las tareas completadas en local storage
    }, [tareasCompletadas]); // el useEffect se ejecuta cuando el estado de las tareas completadas cambia


    const handleTarea = () => {//manejo el evento del input
        if(inputTarea.trim() === "") return; // si el input esta vacio, no hago nada
        
        const nuevaTarea = {
            id: Date.now(),
            texto: inputTarea,
            completada: false
        };
        
        setTareas([...tareas, nuevaTarea]);
        setInputTarea("");
    }

    const handleEliminarTarea = (id: number) =>{//manejo el evento de eliminar la tarea y le paso el index de la tarea
        setTareas(tareas.filter(tarea => tarea.id !== id));
    }
    
    const handleTareaCompletada = (id: number) => {// manejo el evento de marcar la tarea como completada
        setTareas(tareas.map(tarea => 
            tarea.id === id 
                ? { ...tarea, completada: !tarea.completada }
                : tarea
        ));
    }
    
    return(
        <div className="flex flex-col items-center p-4 pt-20 bg-gray-100 min-h-screen ">
            <div className="text-center w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Mi lista de tareas</h2>

                <Card className="p-6 w-full max-w-md">
                    <div className="flex gap-2">
                        <Input placeholder="Nueva tarea..." value={inputTarea} onChange={(e) => setInputTarea(e.target.value)} />
                        {/* el value es el valor del input, el onChange es el evento que se ejecuta cuando el input cambia, y le estoy diciendo que el valor target sera el inputTarea */}
                        <Button onClick={handleTarea}>Agregar</Button>
                    </div>
                </Card>
            </div>

            <div className="mt-6 w-full max-w-md">
                
                <Card className="p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Tareas pendientes </h3>
                    <div className="flex flex-col gap-3">
                        {tareas.map((tarea) => (
                            <div key={tarea.id} className="flex items-center justify-between p-2 rounded-md border border-gray-200 mb-2">
                                <Checkbox 
                                    checked={tarea.completada} 
                                    onCheckedChange={() => handleTareaCompletada(tarea.id)} 
                                />
                                <span className={`${tarea.completada ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                    {tarea.texto}
                                </span>
                                <Button size="sm" variant="outline" onClick={() => handleEliminarTarea(tarea.id)}>
                                    Eliminar
                                </Button>
                            </div>
                        ))}
                    </div>
                    {tareas.length === 0 && (//si el array de tareas esta vacio, muestro el mensaje de no hay tareas pendientes
                        <div className="text-center text-gray-500 mt-6">
                            <p>No hay tareas pendientes</p>
                        </div>
                    )}
                </Card>

                <Card className="p-6 w-full max-w-md mt-6">
                {/* Estadísticas de tareas */}
                <div className="flex flex-col text-gray-700">
                    <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
                    <div className="flex flex-row gap-6 justify-between">
                        <p>Total : <span className="font-bold">{tareas.length}</span></p>
                        <p>Completadas: <span className="font-bold">{tareas.filter(t => t.completada).length}</span></p>
                        <p>Pendientes: <span className="font-bold">{tareas.filter(t => !t.completada).length}</span></p>
                    </div>
                </div>
                </Card>
                
            </div>
            
            
        </div>
    )
}