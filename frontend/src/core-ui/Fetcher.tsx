import React, { ReactNode, useState, ReactElement, useEffect } from 'react';
import { userDataMock } from '../fixtures/user';

type Props = {
  url: string;
  requestOptions?: RequestInit;
  onSuccess: (data: Record<string, unknown>) => void;
  onFailure?: (err: Error) => void;
  fallback: () => ReactElement; // Ini di render kalo masih loading
  children: ReactNode;
};
export default function Fetcher(props: Props) {
  let { fallback, url, requestOptions, onSuccess, onFailure } = props;

  let [isFetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setFetching(false);
        onSuccess(data);
      })
      .catch((err) => {
        onFailure && onFailure(err);
      });

    // setFetching(false);
    // onSuccess(userDataMock);
  }, [url, requestOptions, onSuccess, onFailure]);

  if (isFetching) {
    return fallback();
  } else {
    return <>{props.children}</>;
  }
}
