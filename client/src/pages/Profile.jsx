import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 to-light-blue-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="flex flex-col items-center">
            <img
              src={`https://avatar.iran.liara.run/public`} // Gravatar URL
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-cyan-500 mb-4"
            />
            <h1 className="text-3xl font-semibold text-gray-800">
              {user.name}
            </h1>
            <p className="text-lg text-gray-600">{user.email}</p>
            <div className="mt-6 flex space-x-4">
              <Link to="/todos">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">
                  My Todo List
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
