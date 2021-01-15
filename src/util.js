import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
	cases: {
		hex: "#CC1034",

		multiplier: 800,
	},
	recovered: {
		hex: "#7dd71d",

		multiplier: 1200,
	},
	deaths: {
		hex: "#fb4443",
		multiplier: 2000,
	},
};

export const sortData = (data) => {
	const sortedData = [...data];

	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
// Draw circle on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
	data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			color={casesTypeColors[casesType].color}
			fillColor={casesTypeColors[casesType].hex}
			radius={
				Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
			}
		>
			<Popup>
				<div className="info-container">
					<div
						style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
					className="info-flag"/>
					<div className="info-name">{country.country}</div>
					<div className="info-confirmed">Cases: {numeral(country.cases).format("0.0")}</div>
					<div className="info-recovered">Recovered: {numeral(country.recovered).format("0.0")}</div>
					<div className="info-deaths">Deaths: {numeral(country.deaths).format("0.0")}</div>
				</div>
			</Popup>
		</Circle>
	));