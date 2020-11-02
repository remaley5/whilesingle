import React, { useState, useContext, useEffect } from 'react';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AuthContext from '../../auth'

function Upload({open, setOpen}) {
	const [photoFile, setPhotoFile] = useState(null);
	const [photos, setPhotos] = useState([])
	const { fetchWithCSRF, currentUserId } = useContext(AuthContext);

	const handleChange = (e) => {
		e.preventDefault()
		setPhotoFile(e.target.files[0]);
	};

	useEffect(() => {
		// console.log('photofile', photoFile)
		const formData = new FormData();
		formData.append("file", photoFile);
		if(photoFile){
			postPhoto(formData);
		}
	}, [photoFile])

	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/users/photos/${currentUserId}`);
			const responseData = await response.json();
			let photos = responseData.photos
			setPhotos(photos);
		})()
	}, []);

	const postPhoto = async (formData) => {
		//just hard coded a user id for example:
		let response = await fetchWithCSRF(`/api/uploads/${currentUserId}/upload`, {
			method: 'POST',
			body: formData,
		});
		if (response.ok) {
			const data = await response.json()
			setTimeout(() => {

			}, 1000);
			setPhotos([...photos, data.photo])
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		setOpen(false)
	};

	return (
		<div className='upload-con'>
			<div className='added-photos-con'>
				{
					(photos.length >= 1) ?
						photos.map((photo, idx) => (
							<div key={idx} className='added-photo-con'>
							<img className='added-photo' src={photo.photo_url} alt='phot' />
							</div>
						)) : <div></div>
				}
			</div>
			<form className='sel-photo-form'>
				<label htmlFor="file-upload" className="sel-btn choose">
					choose file
				</label>
				<input
					id='file-upload'
					onChange={handleChange}
					type='file'
					name='file'
				></input>
				<br />
				<button className='sel-btn upload' onClick={handleSubmit}>
					save
				</button>
			</form>
		</div>
	);
}

export default Upload;
