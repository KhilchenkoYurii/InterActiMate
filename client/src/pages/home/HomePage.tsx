import { useEffect, useState } from "react";
import { RequestCardPlaceHolder } from "../../components/Placeholders/RequestCardPlaceHolder/RequestCardPlaceHolder";
import ApiService from "../../services/api.service";
import "./HomePage.scss";
import {
  IRequestCard,
  RequestCard,
} from "../../components/RequestCard/RequestCard";
import { Tabs } from "../../components/Tabs/Tabs";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<IRequestCard[]>([]);
  const [user, setUser] = useState<any>(undefined);
  const [tabName, setTabName] = useState<string>("Оголошення");

  const tabs = [
    { name: "Оголошення", path: "/" },
    { name: "Подані заявки", path: "/" },
  ];

  const token = document.cookie.split("jwt=").pop();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await ApiService.get("posts");
      setRequests(data?.data?.posts);
    })();

    (async () => {
      if (userId && token) {
        try {
          const {
            data: {
              data: { user },
            },
          } = await ApiService.get(`users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(user);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTabName={tabName}
        setTabName={(tabName: string) => setTabName(tabName)}
      />
      <div className="cards-container">
        {isLoading
          ? requests.map(() => <RequestCardPlaceHolder />)
          : tabName === tabs[0].name
          ? requests.map((request) => (
              <RequestCard key={request?._id} {...request} />
            ))
          : requests
              .filter((req) => req.participators.includes(user.userId))
              .map((request) => (
                <RequestCard key={request?._id} {...request} />
              ))}
      </div>
    </div>
  );
};
