import React, { useState, useContext, useEffect } from 'react';

//This is an example to show the flow of data and mainly
//How to create form data for posting a photo.
import AuthContext from '../../auth'

function Upload() {
	const [photoFile, setPhotoFile] = useState(null);
	const [photos, setPhotos] = useState([])
	const { fetchWithCSRF, currentUserId } = useContext(AuthContext);

	const handleChange = (e) => {
		setPhotoFile(e.target.files[0]);
		setPhotos([...photos, photoFile])
	};

	// useEffect(() => {
	// 	setPhotos([...photos, photoFile])
	// }, [photoFile])

	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/users/photos/${currentUserId}`);
			const responseData = await response.json();
			let photos = responseData.photos
			setPhotos(photos);
			console.log(photos)
		})()
	}, []);

	const postPhoto = async (formData) => {
		//just hard coded a user id for example:
		let response = await fetchWithCSRF(`/api/uploads/${currentUserId}/upload`, {
			method: 'POST',
			body: formData,
		});
		if (response.ok) {
			return "response is good"
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData();
		// formData.append('userName', userName);
		// console.log('Photofile', photoFile)
		formData.append("file", photoFile);
		//depending on how you set up your fetch.
		postPhoto(formData);
	};

	return (
		<div>
			<div className='photo-con'>
				{photos.map((photo) => (
					<img src={photo.photo_url} alt='phot' />
				))}
			</div>
			<form>
				<p>Select a photo to upload!</p>
				<input
					id='photoname'
					onChange={handleChange}
					type='file'
					name='file'
				></input>
				<br />
				<button className='upload-form__button' onClick={handleSubmit}>
					Upload
				</button>
			</form>
		</div>
	);
}

export default Upload;
