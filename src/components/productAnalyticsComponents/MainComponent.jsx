import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaThumbsUp, FaClock, FaCheckCircle, FaCalendarAlt, FaEllipsisH, FaRegClock, FaMoneyBill } from 'react-icons/fa';
import { PopupButton } from "react-calendly"; 
import useAxiosPrivate from '../../hooks/useAxiosPrivate'; 
import { constants } from '../../utility/constants';

const data = [
  { date: '01', thisMonth: 6, lastMonth: 7 },
  { date: '02', thisMonth: 7, lastMonth: 5 },
  { date: '03', thisMonth: 8, lastMonth: 6 },
  { date: '04', thisMonth: 4, lastMonth: 4 },
  { date: '05', thisMonth: 7, lastMonth: 8 },
  { date: '06', thisMonth: 5, lastMonth: 6 },
  { date: '07', thisMonth: 8, lastMonth: 7 },
];

const goals = [
  {
    iconColor: 'bg-purple-600',
    icon: <FaRegClock className="text-white" />,
    goalName: 'Launch MVP',
    statusColor: 'text-orange-500',
    status: 'In progress',
    time: '4 weeks',
  },
  {
    iconColor: 'bg-yellow-500',
    icon: <FaRegClock className="text-white" />,
    goalName: 'Secure Seed Funding',
    statusColor: 'text-blue-500',
    status: 'On hold',
    time: '8 weeks',
  },
  {
    iconColor: 'bg-blue-500',
    icon: <FaRegClock className="text-white" />,
    goalName: 'Build User Community',
    statusColor: 'text-green-500',
    status: 'Done',
    time: '12 weeks',
  },
];

const MainComponent = ({ userId }) => {
  const axiosPrivate = useAxiosPrivate();
  const { axiosGet } = useAxiosPrivate();
  const [userName, setUserName] = useState('');
  const [worth, setWorth] = useState(''); 
  const [revenue, setRevenue] = useState(''); 

  useEffect(() => {
    const fetchProfileData = async () => {
      try {

        const token = localStorage.getItem('userToken');


        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; 

        const response = await axiosGet(constants.GETPRODUCTPROFILE + userId);
        if (response) {
          const user = response.product; 
          setUserName(user.fullName || 'User'); 
          setWorth(user.networth || 'NA'); 
          setRevenue(user.revenue || 'NA'); 
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchProfileData();
  }, []);

  const CALENDLY_URL = "https://calendly.com/nikhildamwani-14/product-owner-meet";

  return (
    <div className="p-8 bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Hello, {userName}</h1>
          <p className="text-gray-400">Track company progress here. You're close to achieving your goals!</p>
        </div>
        <div className="flex items-center space-x-4">
          <span>16 May, 2023</span>
          <PopupButton
            url={CALENDLY_URL}
            rootElement={document.getElementById("root")}
            text={<FaCalendarAlt className="text-xl text-gray-400 cursor-pointer" />}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg flex items-center">
          <FaThumbsUp className="text-3xl text-green-500" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">18</h2>
            <p className="text-gray-400">Goals Completed</p>
            <p className="text-green-500">+3 goals this month</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex items-center">
          <FaClock className="text-3xl text-red-500" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">31h</h2>
            <p className="text-gray-400">Work Hours Logged</p>
            <p className="text-red-500">-6 hours last week</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex items-center">
          <FaMoneyBill className="text-3xl text-white" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">${worth}</h2>
            <p className="text-gray-400">Company Net Worth</p>
            <p className="text-green-500">+2000%</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex items-center">
          <FaCheckCircle className="text-3xl text-white" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">${revenue}</h2>
            <p className="text-gray-400">Annual Revenue</p>
            <p className="text-green-500">+2000%</p>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#8884d8' }} />
            <Line type="monotone" dataKey="thisMonth" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="lastMonth" stroke="#f5a623" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Current Goals */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Current Goals</h2>
          <p className="text-gray-400">30% Completed</p>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg">Week</button>
        </div>
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${goal.iconColor}`}>
                  {goal.icon}
                </div>
                <span>{goal.goalName}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={goal.statusColor}>{goal.status}</span>
                <div className="flex items-center space-x-1">
                  <FaRegClock className="text-gray-400" />
                  <span className="text-gray-400">{goal.time}</span>
                </div>
                <FaEllipsisH className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
