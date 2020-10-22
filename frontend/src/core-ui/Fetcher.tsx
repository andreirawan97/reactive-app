import React, {
  ReactNode,
  useState,
  ReactElement,
  useEffect,
  useCallback,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import homebrewFetch from '../helpers/homebrewFetch';
import { Response } from '../types/firestore';

import Loading from './Loading';

type Props = {
  method: 'GET' | 'POST';
  URL: string;
  requestBody?: object;
  onSuccess: (data: Response) => void;
  onFailure?: (err: Error) => void;
  fallback?: () => ReactElement; // Ini di render kalo masih loading
  children: ReactNode;
};
export default function Fetcher(props: Props) {
  let { method, fallback, URL, requestBody = {}, onSuccess, onFailure } = props;

  let [isFetching, setFetching] = useState(true);

  useFocusEffect(
    useCallback(() => {
      try {
        homebrewFetch(method, URL, requestBody)
          .then((response) => response.json())
          .then((data) => {
            setFetching(false);
            onSuccess(data);
          });
      } catch (err) {
        onFailure && onFailure(err);
      }
    }, [method, URL, requestBody, onSuccess, onFailure]),
  );

  if (isFetching) {
    return fallback ? fallback() : <Loading />;
  } else {
    return <>{props.children}</>;
  }
}
