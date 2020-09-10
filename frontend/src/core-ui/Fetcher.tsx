import React, {
  ReactNode,
  useState,
  ReactElement,
  useEffect,
  useCallback,
} from 'react';
import { AppState } from 'react-native';

import homebrewFetch from '../helpers/homebrewFetch';
import { Response } from '../types/firestore';

import Loading from './Loading';
import { useFocusEffect } from '@react-navigation/native';

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
  let {
    method,
    fallback = Loading,
    URL,
    // todo: add token as default request body
    requestBody = {},
    onSuccess,
    onFailure,
  } = props;

  let [isFetching, setFetching] = useState(true);

  // let request = useCallback(async () => {
  //   try {
  //     let response = await homebrewFetch(method, URL, requestBody);
  //     let data = await response.json();
  //     setFetching(false);
  //     onSuccess(data);
  //   } catch (err) {
  //     onFailure && onFailure(err);
  //   }
  // }, []);

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
