/**
 * Module dependencies.
 */

import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

/**
 * `GlobalStyle` styled component.
 */

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	html, body {
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
		Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
		sans-serif;
		margin: 0;
		padding: 0;
		background-color: #fff;
	}
`;

/**
 * Function `App` page.
 */

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<GlobalStyle />

				<Component {...pageProps} />
			</Hydrate>

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

/**
 * Export `MyApp` page.
 */

export default MyApp;
