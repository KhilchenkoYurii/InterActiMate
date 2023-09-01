import { useEffect, useState } from "react";
import { RequestCardPlaceHolder } from "../../components/Placeholders/RequestCardPlaceHolder/RequestCardPlaceHolder";
import ApiService from "../../services/api.service";
import "./HomePage.scss";
import { IRequestCard, RequestCard } from "../../components/RequestCard/RequestCard";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<IRequestCard[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const getPosts = async() => {
      const { data } = await ApiService.get('posts');
      setRequests(data?.data?.posts);
      setIsLoading(false);
    };
    getPosts();
  }, []);
  
  return (
    <div className="cards-container">
      {isLoading ? requests.map(() => (
        <RequestCardPlaceHolder />
      )) : requests.map((request) => (
        <RequestCard key={request?._id} {...request} />
      ))}
    </div>
  );
};