import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';
import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';

function Todos(props) {
    const location = useLocation();
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    var email = props.email;

    // Create todo
    const createTodo = async (e) => {
        console.log(email); //burada test ediyorum boş dönüyor.
        e.preventDefault(e);
        if (input === '') {
            alert('Please enter a valid todo');
            return;
        }
        await addDoc(collection(db, email), {
            text: input,
            completed: false,
        });
        setInput('');
    };

    // Read todo from firebase
    useEffect(() => {
        if (!email) return; // Check if props.email is defined
        const q = query(collection(db, email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id });
            });
            setTodos(todosArr);
        });
        return () => unsubscribe();
    }, [email]); // Add props.email to the dependency array


    // Update todo in firebase
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, email, todo.id), {
            completed: !todo.completed,
        });
    };

    // Delete todo
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, email, id));
    };

    return (
        <div>
            <div className='app-container'>
                <div className='header-container'>
                    <h3>Todo App</h3>
                </div>
                <div className='form-container'>
                    <form onSubmit={createTodo}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type='text'
                            placeholder='Todo ekle'
                        />
                        <button>
                            <AiOutlinePlus size={30} />
                        </button>
                    </form>
                </div>
                <div className='list-container'>
                    <ul>
                        {todos.map((todo, index) => (
                            <Todo
                                key={index}
                                todo={todo}
                                toggleComplete={toggleComplete}
                                deleteTodo={deleteTodo}
                            />
                        ))}
                    </ul>
                </div>
                <div className='info-container'>
                    {todos.length < 1 ? null : (
                        <p>{`You have ${todos.length} todos`}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Todos;
