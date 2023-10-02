import { useEffect, useState } from "react";
import { IRequestCard } from "../../components/RequestCard/RequestCard";
import apiService from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import MyRequests from "../../components/MyRequests/MyRequests";
import { TitleWithIcons } from "../../components/PageTitleWithIcons/TitleWithIcons";

function MyRequestsPage() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const [requests, setRequests] = useState<IRequestCard[]>([]);

  useEffect(() => {
    if (!userId) navigate("/");
    (async () => {
      const {
        data: {
          data: { posts },
        },
      } = await apiService.get("posts");
      setRequests(posts.filter((post: IRequestCard) => post.owner === userId));
    })();
  }, []);

  return (
    <div>
      <TitleWithIcons title="Мої оголошення" />
      {requests.length > 0 ? (
        <MyRequests requests={requests} />
      ) : (
        <div>No posts!</div>
      )}
    </div>
  );
}

export default MyRequestsPage;
