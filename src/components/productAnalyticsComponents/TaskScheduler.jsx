import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaSyncAlt } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { constants } from '../../utility/constants';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const TaskScheduler = () => {
  const { axiosGet, axiosPost, axiosPatch, axiosDelete } = useAxiosPrivate();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await axiosGet(constants.TASKS);
      if (data && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        setTasks([]); 
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]); 
    }
  };

  const addTask = async (values, { resetForm }) => {
    try {
      const data = await axiosPost(constants.TASKS, values);
      setTasks([...tasks, data.task]);
      resetForm();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axiosDelete(`${constants.TASKS}/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const data = await axiosPatch(`${constants.TASKS}/${taskId}/status`, { status });
      setTasks(tasks.map((task) => (task._id === taskId ? data.task : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const validationSchema = Yup.object({
    task: Yup.string().required('Task name is required'),
    status: Yup.string().oneOf(['in progress', 'done', 'on hold'], 'Invalid status').required('Status is required'),
    time: Yup.string().required('Time is required'),
  });

  return (
    <div className="w-1/4 flex justify-end items-start">
      <div className="bg-gray-900 text-white rounded-lg space-y-4 w-full">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-center py-4">Task Scheduler</h2>

        {/* Formik Form for Task Input */}
        <Formik
          initialValues={{ task: '', status: 'in progress', time: '' }}
          validationSchema={validationSchema}
          onSubmit={addTask}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4 bg-gray-800 p-4 rounded-lg">
              <div className="flex flex-col mb-4">
                <Field
                  type="text"
                  name="task"
                  placeholder="New Task"
                  className="bg-gray-800 text-white border-none outline-none p-2 rounded-lg"
                />
                <ErrorMessage name="task" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col mb-4">
                <Field
                  as="select"
                  name="status"
                  className="bg-gray-700 text-white p-2 rounded-lg"
                >
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="on hold">On Hold</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col mb-4">
                <Field
                  type="text"
                  name="time"
                  placeholder="Time"
                  className="bg-gray-800 text-white border-none outline-none p-2 rounded-lg"
                />
                <ErrorMessage name="time" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center">
                <FaPlus className="mr-2" />
                {isSubmitting ? 'Adding...' : 'Add Task'}
              </button>
            </Form>
          )}
        </Formik>

        {/* Task List */}
        <div className="space-y-4 overflow-y-auto p-4 max-h-[500px]" >

          {tasks.length > 0 ? (
            tasks.slice().reverse().map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-lg mb-2"
              >
                <div>
                  <span className="block text-lg font-semibold">{task.task}</span>
                  <span
                    className={`block text-sm ${
                      task.status === 'done'
                        ? 'text-green-500'
                        : task.status === 'on hold'
                        ? 'text-yellow-500'
                        : 'text-orange-500'
                    }`}
                  >
                    {task.status}
                  </span>
                  <span className="text-gray-400 text-sm">{task.time}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateTaskStatus(task._id, 'in progress')}
                    className="text-blue-500"
                  >
                    <FaSyncAlt />
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No tasks scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskScheduler;
