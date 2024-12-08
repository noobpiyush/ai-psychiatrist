import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); // Check for the token

      if (!token) {
        return; // If no token, skip the API call
      }

      try {
        const res = await axios.post(
          "https://backend.100xprojects.online/api/v1/user/check-auth",
          {}, // Empty body
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log("inside try");
        
        if (res.status === 200) {
          navigate("/chat"); // Redirect to /chat if the user is authenticated
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        // Handle error or leave user on the homepage
      }
    };

    checkAuth();
  }, [navigate]); // Add navigate as a dependency

  return (
    <div className="container mx-auto px-6 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MindfulAI</h1>
        <p className="text-xl mb-8">
          Your personal AI companion for mental wellness
        </p>
        <Button asChild>
          <Link to="/features">Explore Features</Link>
        </Button>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          How MindfulAI Can Help You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p>
              Always here to listen and provide guidance, whenever you need it.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
            <p>
              Gain valuable insights into your mental health patterns and progress.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Guided Exercises</h3>
            <p>
              Access a variety of mindfulness and relaxation exercises tailored to your needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
