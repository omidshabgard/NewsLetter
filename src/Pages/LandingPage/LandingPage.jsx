import React, { useState, useEffect, useCallback } from 'react';
import {
	fetchNewsData,
	saveToLocalStorage,
	getFromLocalStorage,
} from '../../utils/ThirdPartyApi';
import NewsCard from '../../components/NewsCard/NewsCards';
import SearchBar from '../../components/SearchBar/SearchBar';
import NothingFound from '../../components/NothingFound/NothingFound'; // Import the NothingFound component
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
				setNewsData([]); // Explicitly set newsData to an empty array if no data
				setError(null); // Clear error state in case of no results
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
		// Simulate a 2-second delay for the preloader
 setTimeout(() => {
	
}, 2000);
	};
 
	const loadMore = () => {
		setShowCount((prevCount) => prevCount + 3);
	};

	return (
		<main className={styles.container}>
			<header className={styles.header}>
				<img src={image} alt='' className={styles.headerBackground} />
				<NavBar />
				<section className={styles.hero}>
					<div className={styles.content}>
					<h2 className={styles.heroTitle}>
						What's going on in<br/> the world?
					</h2>
					<p className={styles.heroDescription}>
						Find the latest news on any topic and save them in your personal account.
					</p>
					</div>
					<SearchBar onSearch={handleSearch} />
				</section>
			</header>

<section className={styles.results}>
  {error ? (
    <NothingFound />
  ) : loading ? (
    <div className={styles.circlePreloader}></div>
  ) : newsData.length === 0 ? (
    <NothingFound />
  ) : (
    <div>
      <h2 className={styles.resultsTitle}>Search results</h2>
      <div className={styles.newsGrid}>
        {(newsData || [])
          .slice(0, showCount)
          .map((news, index) => (
            <NewsCard
              key={index}
              date={news.dateTime || 'No Date Available'}
              title={news.title || 'No Title Available'}
              description={
                news.body?.length > 150
                  ? `${news.body.slice(0, 150)}...`
                  : news.body || 'No Description'
              }
              source={news.source || 'Unknown Source'}
              image={
                news.image || 'https://via.placeholder.com/150'
              }
            />
          ))}
      </div>
    </div>
  )}

  {!loading && !error && newsData.length > showCount && (
    <button onClick={loadMore} className={styles.showMore}>
      Show more
    </button>
  )}
</section>


<section className={styles.author}>
  <div>
    <img src={image2} alt='Author' className={styles.authorImage} />
  </div>
  <div className={styles.authorContent}>
    <h2 className={styles.authorTitle}>About the author</h2>
    <p className={styles.authorDescription}>
      This block describes the project author. Here you should
      indicate your name, what you do, and which development
      technologies you know.
      <br />
      <br />
      You can also talk about your experience with TripleTen,
      what you learned there, and how you can help potential
      customers.
    </p>
  </div>
</section>
			<Footer />
		</main>
	);
};

export default LandingPage;
