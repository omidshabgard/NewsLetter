const API_URL = 'https://eventregistry.org/api/v1/article/getArticles';
const API_KEY = '96fc2acf-a8a9-4b69-8808-00ce4f8bf5ea'; // Replace with your API key

export const fetchNewsData = async (query) => {
	const params = new URLSearchParams({
		apiKey: API_KEY,
		keyword: query,
	});

	try {
		const response = await fetch(`${API_URL}?${params}`);
		if (!response.ok) {
			console.log(response);
			throw new Error('Error fetching data from API');
		}

		const data = await response.json();

		const articles =
			data?.articles?.results?.map((article) => ({
				uri: article.uri,
				title: article.title,
				body: article.body,
				url: article.url,
				dateTime: formatDate(article.dateTime),
				source: article.source?.title || 'Unknown Source',
				image: article.image || 'https://via.placeholder.com/150',
				lang: article.lang || 'Unknown',
			})) || [];

		return articles;
	} catch (error) {
		throw new Error(
			error.message || 'Sorry, something went wrong during the request.'
		);
	}
};

const formatDate = (dateTime) => {
	if (!dateTime || isNaN(new Date(dateTime).getTime())) {
		return 'Invalid Date';
	}
	return new Date(dateTime).toLocaleString();
};

export const saveToLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
	const storedData = localStorage.getItem(key);
	return storedData ? JSON.parse(storedData) : null;
};
