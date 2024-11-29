import { useState, useEffect } from "react";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  password: string;
  hashed_refresh_token: string;
  createdAt: string;
  lastUpdateAt: string;
}

const Dashboard = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("access_token");

  async function handleGetUsers() {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${API_URL}/users/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response?.data?.data?.users || []);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || "An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div>
      {loading && <div className="w-full h-[500px] flex items-center justify-center">Loading...</div>}
      {error && <p>{error}</p>}
      <div className="">
        {data.length > 0 ? (
          <div className="py-3 w-[200px] bg-neutral-500 text-center rounded hover:bg-neutral-700 text-[20px] hover:text-white cursor-pointer duration-200">
            <h1>Users</h1>
            {
              data.length
            }
          </div>
        ) : (
          !loading && <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
