import React from "react";

interface User {
  username: string;
  score: number;
  tier: string;
  questions_asked: number;
  answers_given: number;
}

async function fetchLeaderboard() {
  let leaderboard: User[] = [];

  try {
    const response = await fetch("https://nunu29.pythonanywhere.com/users/leaderboard/");
    if (response.ok) {
      const data = await response.json();
      leaderboard = data.slice(0, 10); 
    } else {
      console.error("Failed to fetch leaderboard data");
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }

  return leaderboard;
}

const Ratings = async () => {
  const users = await fetchLeaderboard(); 

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4  text-black">
      <h2 className="text-2xl font-semibold text-center mb-6">Top 10 Users</h2>
      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No leaderboard data available</p>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border-b-2 border-gray-300 
              hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{user.username}</span>
                  <span className="text-sm text-gray-500">Tier: {user.tier}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl">{user.score} points</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Questions Asked: {user.questions_asked}</span>
                  <span>Answers Given: {user.answers_given}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ratings;
