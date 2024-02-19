'use client'
import React, { useState, useEffect } from 'react';
import app from '@/app/firebase/config';
import { getDatabase, ref, onValue, off } from "firebase/database";


const Leaderboard = () => {
    const db = getDatabase(app);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [error, setError] = useState(null);

  useEffect(() => {
    const leaderboardRef = ref(db, 'Scoreboard');

    const fetchData = () => {
        onValue(leaderboardRef, (snapshot) => {
            try {
                const leaderboardData = snapshot.val();
                if (leaderboardData) {
                    const sortedData = Object.entries(leaderboardData).sort((a, b) => b[1].score - a[1].score);
                    setLeaderboardData(sortedData);
                }
                setError(null);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
                setError("Error fetching leaderboard data");
            }
        }, (error) => {
            console.error("Error retrieving data:", error);
            setError("Error retrieving data");
        });
    };

    fetchData();
    return () => {off(leaderboardRef);}
  }, []);

  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <div className='flex justify-center bg-gray-100 flex-col p-4 rounded-3xl w-3/5'>
      <div className='font-bold mt-3 mb-6'><h1 className='text-center text-[36px]'>Leaderboard</h1></div>
      <table className='border-collapse border border-gray-400'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border border-gray-400 p-2'>Rank</th>
            <th className='border border-gray-400 p-2'>Player</th>
            <th className='border border-gray-400 p-2'>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map(([key, data], index) => (
            <tr key={key} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className='border border-gray-400 p-2'>{index + 1}</td>
              <td className='border border-gray-400 p-2'>{data.username}</td>
              <td className='border border-gray-400 p-2'>{data.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Leaderboard;