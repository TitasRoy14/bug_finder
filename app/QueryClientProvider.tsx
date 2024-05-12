'use client';
import {
  QueryClient,
  QueryClientProvider as ReactQueryCLientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
    },
  },
});

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryCLientProvider client={queryClient}>
      {children}
    </ReactQueryCLientProvider>
  );
};

export default QueryClientProvider;
