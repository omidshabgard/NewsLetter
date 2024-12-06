import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage';
import SavedArticles from '../components/SavedArticls/SavedNewsPage';
import { getFromLocalStorage } from './ThirdPartyApi';
import './App.css';

function App() {
	const [savedArticles, setSavedArticles] = useState([]);

	useEffect(() => {
		try {
			const storedArticles = getFromLocalStorage('newsData');
			if (storedArticles) {
				setSavedArticles(storedArticles);
			}
		} catch (error) {
			console.error('Error reading from local storage:', error);
		}
	}, []);

	return (
		<div className='roboto-slab'>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route
						path='/saved-articles'
						element={
							<SavedArticles savedArticles={savedArticles} />
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;