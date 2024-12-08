import { cookies } from "next/headers";
import { API_ROUTES, apiFetcher } from "@/app/utils/apiClient";
import LogoutButton from "@/app/Components/LogoutButton";
export default async function Profile() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const username = cookieStore.get("username")?.value;

  if (!accessToken || !username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Missing Access Token or Username</h2>
          <p className="text-gray-500 mt-2">Please log in to access your profile.</p>
        </div>
      </div>
    );
  }

  const profileUrl = `${API_ROUTES.profile}/${username}/`;

  try {
    const profileData = await apiFetcher<{
      username: string;
      email: string;
      profile_image: string;
      full_name: string;
      achievements: { tier: string; achieved_at: string }[] | null;
      current_tier: string;
      score: number;
    }>(profileUrl, undefined, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileData) {
      throw new Error("Failed to fetch profile data.");
    }

    const defaultProfileImage = "https://img.freepik.com/premium-vector/user-icon-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable_697711-1132.jpg?text=No+Image";

    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <img
              src={profileData.profile_image || defaultProfileImage}
              alt={`${profileData.username}'s Profile`}
              className="w-32 h-32 rounded-full object-contain border-4 border-indigo-600 shadow-md"
            />
            <div>
              <h1 className="text-3xl font-semibold text-black">{profileData.full_name}</h1>
              <p className="text-xl text-gray-700">@{profileData.username}</p>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-black">Achievements</h2>
            <div className="bg-white border rounded-lg p-6 shadow-md">
              <ul className="space-y-3">
                {profileData.achievements?.map((achievement, index) => (
                  <li key={index} className="flex justify-between items-center text-gray-800">
                    <span className="font-semibold">{achievement.tier}</span>
                    <span className="text-sm text-gray-600">
                      {new Date(achievement.achieved_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Score Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black">Score</h2>
            <p className="text-4xl font-semibold text-gray-800">{profileData.score}</p>
          </div>

          {/* Current Tier Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black">Current Tier</h2>
            <p className="text-xl text-indigo-600 font-semibold">{profileData.current_tier}</p>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error Fetching Profile</h2>
          <p className="text-gray-500 mt-2">Something went wrong while fetching your profile. Please try again later.</p>
        </div>
      </div>
    );
  }
}
