import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<link
						href="/2048x2732.png"
						sizes="2048x2732"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/1668x2224.png"
						sizes="1668x2224"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/1536x2048.png"
						sizes="1536x2048"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/1125x2436.png"
						sizes="1125x2436"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/1242x2208.png"
						sizes="1242x2208"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/750x1334.png"
						sizes="750x1334"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/640x1136.png"
						sizes="640x1136"
						rel="apple-touch-startup-image"
					/>
					<link
						rel="apple-touch-icon"
						sizes="128x128"
						href="/logo-smallest.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/logo-small.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="167x167"
						href="/logo-medium.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/logo-big.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="512x512"
						href="/logo-biggest.png"
					/>
					<link rel="theme-color" href="#fff" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
