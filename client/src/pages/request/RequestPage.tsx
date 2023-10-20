import { useEffect, useState } from 'react';
import ApiService from '../../services/api.service';
import { IRequestCard } from '../../components/RequestCard/RequestCard';
import { Card } from '../../components/Card/Card';
import { useSearchParams } from 'react-router-dom';

export const RequestPage = () => {
  const [searchParams] = useSearchParams();

  const [request, setRequest] = useState<IRequestCard>(
    null as unknown as IRequestCard,
  );

  useEffect(() => {
    const _id = searchParams.get('id');

    (async () => {
      const {
        data: { data },
      } = await ApiService.get(`posts/${_id}`);

      const combinedRequest = {
        ...data.post,
        ...data.owner,
      };
      setRequest(combinedRequest);
    })();
  }, [searchParams]);

  return (
    <div>
      <Card {...request} />
    </div>
  );
};
