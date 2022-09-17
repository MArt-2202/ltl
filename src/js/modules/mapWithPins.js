export default function mapWithPins(node) {
	if (
		document.querySelector(node) &&
		document.querySelector(node)?.dataset.json &&
		document.querySelector(node)?.dataset.pin &&
		document.querySelector(node)?.dataset.center
	) {
		const mapWrapper = document.querySelector(node),
			dataJson = mapWrapper?.dataset.json,
			pinIcon = mapWrapper?.dataset.pin,
			mapCenter = mapWrapper?.dataset.center.split(',').map((el) => parseFloat(el));

		fetch(dataJson)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				return JSON.parse(data);
			})
			.then((data) => {
				const locationData = data;

				const map = new google.maps.Map(mapWrapper, {
					zoom: 6,
					center: new google.maps.LatLng(...mapCenter),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
				});
				const infoWindow = new google.maps.InfoWindow();
				google.maps.event.addListener(map, 'click', function () {
					infoWindow.close();
				});
				const onMarkerClick = function () {
					const marker = this;
					infoWindow.setContent(marker.content);
					infoWindow.open(map, marker);
				};
				for (let i = 0; i < locationData.length; i++) {
					const marker = new google.maps.Marker({
						map: map,
						title: `${locationData[i].title}`,
						content: `${locationData[i]?.description}`,
						position: new google.maps.LatLng(
							+locationData.at(i)?.lat,
							+locationData.at(i)?.lng
						),
						icon: pinIcon,
					});
					google.maps.event.addListener(marker, 'click', onMarkerClick);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
}
