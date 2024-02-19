import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "@/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function withAuth(Component: React.FC<any>) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.currentUser?.id != null;

    useEffect(() => {
      if (!isAuthenticated) {
        toast.error("You must be logged in to access that page.");
        router.replace("/");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return <></>;
    return <Component {...props} />;
  };
}
