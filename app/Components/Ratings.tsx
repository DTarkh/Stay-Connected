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
    const response = await fetch(
      "https://nunu29.pythonanywhere.com/users/leaderboard/"
    );
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
    <div className="w-full bg-gradient-to-br from-purple-100 to-white rounded-2xl shadow-lg p-6 text-gray-800">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Top 10 Users
      </h2>
      <div className="space-y-6">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">
            No leaderboard data available
          </p>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 border-t-4 border-purple-500"
            >
              <div className="flex flex-col space-y-4">
                {/* Username and Tier */}
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-purple-700">
                    {user.username}
                  </span>
                  <span className="text-sm text-gray-500">
                    Tier: {user.tier}
                  </span>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center">
                  <span className="font-bold text-2xl text-gray-900">
                    {user.score} points
                  </span>
                </div>

                {/* Statistics */}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>
                    Questions Asked: <strong>{user.questions_asked}</strong>
                  </span>
                  <span>
                    Answers Given: <strong>{user.answers_given}</strong>
                  </span>
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
