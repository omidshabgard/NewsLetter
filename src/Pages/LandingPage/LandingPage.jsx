import React, { useState, useEffect, useCallback } from 'react';
import {
	fetchNewsData,
	saveToLocalStorage,
	getFromLocalStorage,
} from '../../utils/ThirdPartyApi';
import NewsCard from '../../components/NewsCard/NewsCards';
import SearchBar from '../../components/SearchBar/SearchBar';
import NothingFound from '../../components/NothingFound/NothingFound';
import styles from './LandingPage.module.css';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import image from '../../Assets/Images/lpb.svg';
import image2 from '../../Assets/Images/image-03.svg';

const LandingPage = () => {
	const [newsData, setNewsData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState('tesla');
	const [showCount, setShowCount] = useState(3);

	const fetchNews = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchNewsData(query);
			if (data.length > 0) {
				setNewsData(data);
				saveToLocalStorage('newsData', data);
			} else {
				setNewsData([]);
				setError(null);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [query]);

	useEffect(() => {
		const storedData = getFromLocalStorage('newsData');
		if (storedData) {
			setNewsData(storedData);
			setLoading(false);
		} else {
			fetchNews();
		}
	}, [fetchNews]);

	const handleSearch = (newQuery) => {
		setQuery(newQuery);
		setLoading(true);
		setNewsData([]);
		setShowCount(3);
		fetchNews(newQuery);

		setTimeout(() => {}, 2000);
	};

	const loadMore = () => {
		setShowCount((prevCount) => prevCount + 3);
	};

	return (
		<main className={styles.container}>
			<header className={styles.header}>
				<img
					src={image}
					alt='Landing page background'
					className={styles.headerBackground}
				/>
				<NavBar />
				<section className={styles.hero}>
					<div className={styles.heroContent}>
						<h1 className={styles.heroTitle}>
							What's going on in
							<br /> the world?
						</h1>
						<p className={styles.heroDescription}>
							Find the latest news on any topic and save them in
							your personal account.
						</p>
					</div>
					<div className={styles.searchBar}>
						<SearchBar onSearch={handleSearch} />
					</div>
				</section>
			</header>

			<section className={styles.results}>
				{error ? (
					<NothingFound />
				) : loading ? (
					<div
						className={styles.circlePreloader}
						aria-label='Loading...'
					></div>
				) : newsData.length === 0 ? (
					<NothingFound />
				) : (
					<section>
						<h2 className={styles.resultsTitle}>Search results</h2>
						<ul className={styles.newsGrid}>
							{(newsData || [])
								.slice(0, showCount)
								.map((news, index) => (
									<li key={index}>
										<NewsCard
											date={
												news.dateTime ||
												'No Date Available'
											}
											title={
												news.title ||
												'No Title Available'
											}
											description={
												news.body?.length > 150
													? `${news.body.slice(
															0,
															150
													  )}...`
													: news.body ||
													  'No Description'
											}
											source={
												news.source || 'Unknown Source'
											}
											image={
												news.image ||
												'https://via.placeholder.com/150'
											}
										/>
									</li>
								))}
						</ul>
					</section>
				)}

				{!loading && !error && newsData.length > showCount && (
					<button onClick={loadMore} className={styles.showMore}>
						Show more
					</button>
				)}
			</section>

			<section className={styles.author}>
				<figure>
					<img
						src={image2}
						alt='Author'
						className={styles.authorImage}
					/>
					<figcaption className={styles.authorCaption}>
						<h2 className={styles.authorTitle}>About the author</h2>
						<p className={styles.authorDescription}>
							This block describes the project author. Here you
							should indicate your name, what you do, and which
							development technologies you know.
						</p>
						<p className={styles.authorDescription}>
							You can also talk about your experience with
							TripleTen, what you learned there, and how you can
							help potential customers.
						</p>
					</figcaption>
				</figure>
			</section>

			<Footer />
		</main>
	);
};

export default LandingPage;
