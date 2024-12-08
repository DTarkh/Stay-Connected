import { cookies } from "next/headers";
import { API_ROUTES, apiFetcher } from "@/app/utils/apiClient";
import LogoutButton from "@/app/Components/LogoutButton";
import Image from "next/image";
import Link from "next/link";

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
      questions_count: number;
      answers_count: number;
      answers: { question_title: string; answer_text: string; question_id: number }[];
      questions: { question_title: string; question_id: number }[];
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

    const defaultProfileImage =
      "https://img.freepik.com/premium-vector/user-icon-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable_697711-1132.jpg?text=No+Image";

    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <Image
              src={profileData.profile_image || defaultProfileImage}
              alt={`${profileData.username}'s Profile`}
              width={128}
              height={128}
              className="rounded-full border-4 border-indigo-600 shadow-md"
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

          {/* Score and Tier Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black">Stats</h2>
            <p className="text-lg text-gray-800">Score: {profileData.score}</p>
            <p className="text-lg text-gray-800">Questions Asked: {profileData.questions_count}</p>
            <p className="text-lg text-gray-800">Answers Given: {profileData.answers_count}</p>
            <p className="text-lg text-indigo-600 font-semibold">
              Current Tier: {profileData.current_tier}
            </p>
          </div>

                {/* Answers Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Your Answers</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {profileData.answers.map((answer) => (
                <div
                  key={answer.question_id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
                >
                  <Link
                    href={`/home/${answer.question_id}`}
                    className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 transition-colors underline"
                  >
                    {answer.question_title}
                  </Link>
                  <p className="text-gray-700 mt-3 text-sm line-clamp-2">{answer.answer_text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Your Questions</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {profileData.questions.map((question) => (
                <div
                  key={question.question_id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
                >
                  <Link
                    href={`/home/${question.question_id}`}
                    className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors underline"
                  >
                    {question.question_title}
                  </Link>
                </div>
              ))}
            </div>
          </div>


          {/* Logout Button */}
          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  } catch {
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
