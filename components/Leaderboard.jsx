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
              const sortedData = Object.entries(leaderboardData).map(([key, value]) => ({
                id: key,
                userData: value
              })).sort((a, b) => b.userData.score - a.userData.score);
              console.log(sortedData)
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

      // Clean up the listener when the component unmounts
      return () => {
        off(leaderboardRef);
      };
    }, []); // Empty dependency array to run this effect only once

  return (
 <div className="w-full h-full justify-center items-center flex py-6">
  <div className="border-4 border-[#FFFFFFBB] p-2 w-full mx-2 mid:mx-10 big:w-[960px] rounded-[75px]">
    <div className="flex flex-col justify-center items-center gap-2 p-4 py-8 w-full h-full rounded-[75px] border-4 border-[#FFFFFFBB]">
      <h1 className='text-center text-[42px] text-white flex-none'>Scoreboard</h1>
      <div className='flex grow bg-gray-100 flex-col p-4 rounded-3xl w-full overflow-y-auto max-h-[400px]'>
          <table className='border-collapse border-0 border-gray-400'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border-gray-400 rounded-tl-2xl p-2'>Rank</th>
                <th className='border-gray-400 p-2'>Player</th>
                <th className='border-gray-400 rounded-tr-2xl p-2'>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className='border-gray-400 p-2 text-center'>{index + 1}</td>
                  <td className='border-gray-400 p-2'>{data.userData.username}</td>
                  <td className='border-gray-400 p-2 text-center'>{data.userData.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  );
};

export default Leaderboard;