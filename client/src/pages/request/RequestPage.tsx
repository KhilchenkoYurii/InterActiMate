import { useEffect, useState } from 'react';
// import { useSearchParams } from "react-router-dom";
import ApiService from '../../services/api.service';
import { IRequestCard } from '../../components/RequestCard/RequestCard';
import { Card } from '../../components/Card/Card';

export const RequestPage = () => {
  // TODO: update it after actual posts could be fetched
  const id = 'PST3';
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get('id');
  const [request, setRequest] = useState<IRequestCard>(
    null as unknown as IRequestCard,
  );

  useEffect(() => {
    const getRequestById = async () => {
      const { data: fetchedData } = await ApiService.get(`posts/${id}`);
      const { data: userData } = await ApiService.get(
        `users/${fetchedData?.data?.post?.owner}`,
      );

      const combinedRequest = {
        ...fetchedData?.data?.post,
        ...userData?.data?.user,
      };
      setRequest(combinedRequest);
    };

    getRequestById();
  }, []);

  return (
    <div>
      <Card {...request} />
    </div>
  );
};
