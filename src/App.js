import { Card, CardContent, MenuItem } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { convertToFloat, formatted, sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import logo from "./logo.png";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("Worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapPosition, setMapPosition] = useState({
		lat: 34.80746,
		lng: -40.4796,
	});
	const [mapZoom, setMapZoom] = useState(2);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType]=useState("cases")

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => setCountryInfo(data));
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					const sortedData = sortData(data);
					setTableData(sortedData);
					setMapCountries(data);
					setCountries(countries);
				});
		};
		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		setCountry(countryCode);
		const url =
			countryCode === "Worldwide"
				? "https://disease.sh/v3/covid-19/all" &&
				  setMapPosition({ lat: 8.7832, lng: 34.5085 })
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
				setCountry(countryCode);
				setMapPosition([data.countryInfo.lat, data.countryInfo.long]);
				console.log(data.country);
				setMapZoom(3);
			});
	};

	// if worldwide is clicked, i want the state of the details of the map to direct me to somewhere default

	return (
		<div className="app">
			<div className="app_left">
				<div className="app_header">
					<img src={logo} alt="logo" />
					<FormControl className="app_dropdown">
						<Select
							variant="outlined"
							onChange={onCountryChange}
							value={country}
						>
							<MenuItem value="Worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className="app_stats">
					<InfoBox
						isRed
						title="Coronavirus Cases"
						cases={prettyPrintStat(countryInfo.todayCases)}
						total={prettyPrintStat(countryInfo.cases)}
						onClick={e=>setCasesType("cases")}
						active={casesType==="cases"}
					/>
					<InfoBox
						title="Recovered"
						cases={prettyPrintStat(countryInfo.todayRecovered)}
						total={prettyPrintStat(countryInfo.recovered)}
						onClick={e=>setCasesType("recovered")}
						active={casesType==="recovered"}
					/>
					<InfoBox
						isRed
						title="Deaths"
						total={prettyPrintStat(countryInfo.deaths)}
						cases={prettyPrintStat(countryInfo.todayDeaths)}
						onClick={e=>setCasesType("deaths")}
						active={casesType==="deaths"}
					/>
				</div>
				{/*Map*/}
				<Map countries={mapCountries} center={mapPosition} zoom={mapZoom} casesType={casesType} />
			</div>

			<Card className="app-right">
				<CardContent>
					<h3>Live cases by country</h3>
					<Table countries={tableData} />
					<h3>Worldwide New {casesType} (Past 120 Days)</h3>
					<LineGraph casesType={casesType} />
					{/*Dynamic graph*/}
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
